#!/usr/bin/env python3
"""
PureScan Customer Migration Email Sender
- Sends emails individually (1 recipient at a time) to protect privacy and avoid spam filters.
- Supports both HTML and Plain-Text fallback.
- Reads credentials automatically from .env.
- Logs sent emails to avoid duplicate sends if interrupted.
- Human-like randomized pacing to avoid triggering Gmail rate limits.
"""

import os
import sys
import csv
import time
import random
import smtplib
import argparse
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pathlib import Path


# ==========================================
# ENV LOADER (Zero-dependency)
# ==========================================
def load_env_file(filepath=".env"):
    env_vars = {}
    env_path = Path(filepath)
    if not env_path.exists():
        return env_vars
    
    with open(env_path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            if "=" in line:
                key, val = line.split("=", 1)
                key = key.strip()
                val = val.strip().strip('"').strip("'")
                env_vars[key] = val
    return env_vars


# ==========================================
# CONFIGURATION
# ==========================================
ENV = load_env_file(".env")

GMAIL_USER = os.getenv("GMAIL_USER") or ENV.get("GMAIL_USER", "louisalph.azure@gmail.com")
# Strip any spaces from the App Password if copied like 'gxdr tziq oxdv gbue'
raw_password = os.getenv("GMAIL_APP_PASSWORD") or ENV.get("GMAIL_APP_PASSWORD", "")
GMAIL_APP_PASSWORD = raw_password.replace(" ", "").strip()

CSV_FILE = "recipients.csv"
LOG_FILE = "sent_log.txt"

# Anti-spam safety settings
MIN_DELAY_SECONDS = 18    # Minimum pause between individual emails
MAX_DELAY_SECONDS = 35    # Maximum pause between individual emails
DAILY_SAFETY_LIMIT = 80   # Safe cap for today's run

SUBJECT = "Your PureScan AI upgrade is ready — your subscription transfers automatically 🍏"


# ==========================================
# HELPER FUNCTIONS
# ==========================================
def load_sent_emails():
    """Returns a set of lowercase email addresses that have already been sent."""
    if not os.path.exists(LOG_FILE):
        return set()
    with open(LOG_FILE, "r", encoding="utf-8") as f:
        return set(line.strip().lower() for line in f if line.strip())


def log_sent_email(email):
    """Appends successful send to log file."""
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(f"{email.strip().lower()}\n")


def build_email_content(name):
    """Creates the personalized plain text and HTML bodies."""
    clean_name = name.strip() if name and name.strip() else ""
    salutation = f"Hi {clean_name}," if clean_name else "Hi there,"

    # Plain Text Fallback
    text_content = f"""{salutation}

We've been working hard on something special for you. PureScan AI has been completely rebuilt from the ground up — faster scanning, a massive 10x larger product database, and advanced family safety alerts.

What about your subscription?
Your existing subscription transfers automatically! Just download the new app and log in with your existing account. No extra charges.

Download the new app here:
https://purescan.droploop.in/download

Once you have verified the new app, you can safely remove the old version.

Thank you for being part of our community. If you have any questions, simply reply directly to this email!

Stay healthy,
The PureScan AI Team
"""

    # Responsive HTML Template
    html_content = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1f2937; margin: 0; padding: 20px; background-color: #f9fafb;">
  <div style="max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 32px 28px; border: 1px solid #e5e7eb; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
    
    <div style="text-align: center; margin-bottom: 24px;">
      <h2 style="color: #111827; margin: 0; font-size: 22px; font-weight: 700;">Upgrade to the All-New PureScan AI 🍏</h2>
    </div>

    <p style="font-size: 16px; margin-bottom: 16px;">{salutation}</p>

    <p style="font-size: 15px; color: #374151; margin-bottom: 20px;">
      We've been working hard on something special for you. <strong>PureScan AI has been completely rebuilt from the ground up</strong> — designed to help you and your family eat cleaner and live healthier.
    </p>

    <!-- Subscription Reassurance Box -->
    <div style="background-color: #f0fdf4; border-left: 4px solid #16a34a; padding: 14px 18px; margin: 20px 0; border-radius: 6px;">
      <p style="margin: 0; font-weight: 600; color: #15803d; font-size: 15px;">
        🛡️ Good News: Your Subscription Moves With You
      </p>
      <p style="margin: 4px 0 0; color: #166534; font-size: 14px;">
        Your existing subscription transfers automatically. Just download the new app and sign in with your existing account. No extra charges.
      </p>
    </div>

    <h3 style="font-size: 15px; color: #111827; margin: 20px 0 10px 0;">Why you'll love the new app:</h3>
    <ul style="color: #4b5563; font-size: 14px; padding-left: 20px; margin: 0 0 24px 0; line-height: 1.8;">
      <li><strong>10x Larger Database:</strong> Instant results on millions of new food and cosmetic items.</li>
      <li><strong>Family Safety Alerts:</strong> Real-time warnings for additives, allergens, and harmful chemicals.</li>
      <li><strong>3x Faster Scanning:</strong> Redesigned scanner that works quickly even in low-light aisle settings.</li>
    </ul>

    <!-- CTA Button -->
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://purescan.droploop.in/download" 
         style="background-color: #16a34a; color: #ffffff; padding: 14px 28px; text-decoration: none; font-weight: 600; border-radius: 8px; display: inline-block; font-size: 15px; box-shadow: 0 2px 4px rgba(22, 163, 74, 0.2);">
        👉 Download the New PureScan AI App
      </a>
    </div>

    <p style="font-size: 13px; color: #6b7280; text-align: center; margin: 0 0 20px 0;">
      Once you've set up the new app, you can safely remove the old version from your device.
    </p>

    <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 24px 0;" />

    <p style="font-size: 13px; color: #6b7280; margin: 0;">
      Questions about your transfer? Simply reply directly to this email — we're here to help!<br><br>
      Stay healthy,<br>
      <strong>The PureScan AI Team</strong>
    </p>
  </div>
</body>
</html>
"""
    return text_content, html_content


def create_mime_message(name, email):
    msg = MIMEMultipart("alternative")
    msg["Subject"] = SUBJECT
    msg["From"] = f"PureScan AI Team <{GMAIL_USER}>"
    msg["To"] = email
    msg["Reply-To"] = GMAIL_USER

    text_body, html_body = build_email_content(name)
    msg.attach(MIMEText(text_body, "plain", "utf-8"))
    msg.attach(MIMEText(html_body, "html", "utf-8"))
    return msg


# ==========================================
# MAIN EXECUTION
# ==========================================
def main():
    parser = argparse.ArgumentParser(description="PureScan AI Individual Email Sender")
    parser.add_argument("--test", type=str, help="Send one test email to specified address")
    parser.add_argument("--dry-run", action="store_true", help="Preview list of recipients without sending")
    args = parser.parse_args()

    print("=" * 60)
    print("PureScan AI Migration Mailer (Gmail SMTP 1-by-1)")
    print("=" * 60)

    # Validate Credentials
    if not GMAIL_USER or not GMAIL_APP_PASSWORD:
        print("❌ Error: GMAIL_USER or GMAIL_APP_PASSWORD missing in .env")
        print("Please check your .env file.")
        sys.exit(1)

    print(f"📧 Sender Account: {GMAIL_USER}")

    # Single Test Mode
    if args.test:
        test_email = args.test.strip()
        print(f"\n🚀 Running in TEST mode. Sending 1 email to: {test_email}")
        try:
            server = smtplib.SMTP_SSL("smtp.gmail.com", 465)
            server.login(GMAIL_USER, GMAIL_APP_PASSWORD)
            msg = create_mime_message("Test User", test_email)
            server.sendmail(GMAIL_USER, test_email, msg.as_string())
            server.quit()
            print("✅ Test email sent successfully! Check your inbox.")
        except Exception as e:
            print(f"❌ Failed to send test email: {e}")
        return

    # Load previously sent records
    sent_emails = load_sent_emails()
    print(f"📋 Found {len(sent_emails)} already sent email(s) in {LOG_FILE}.")

    # Load recipients
    if not os.path.exists(CSV_FILE):
        print(f"❌ Error: {CSV_FILE} not found!")
        sys.exit(1)

    pending_recipients = []
    with open(CSV_FILE, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            email = row.get("email", "").strip()
            name = row.get("name", "").strip()
            if email and email.lower() not in sent_emails:
                pending_recipients.append({"name": name, "email": email})

    total_pending = len(pending_recipients)
    print(f"📬 Pending recipients: {total_pending}")

    if total_pending == 0:
        print("🎉 All recipients in recipients.csv have already received the email! Done.")
        return

    # Dry Run Mode
    if args.dry_run:
        print("\n🔍 DRY RUN PREVIEW (No emails will be sent):")
        for i, item in enumerate(pending_recipients, 1):
            name_display = item["name"] if item["name"] else "(default: Hi there)"
            print(f"  {i}. {item['email']} -> Greeting: {name_display}")
        print("\nTo start sending real emails, run: python3 send_emails.py")
        return

    # Apply safe daily quota
    to_send = pending_recipients[:DAILY_SAFETY_LIMIT]
    print(f"🚀 Preparing to send batch of {len(to_send)} email(s).")
    print(f"⏱️  Pacing delay: {MIN_DELAY_SECONDS}s to {MAX_DELAY_SECONDS}s randomized between sends.\n")

    # Connect to SMTP
    try:
        print("Connecting to smtp.gmail.com:465...")
        server = smtplib.SMTP_SSL("smtp.gmail.com", 465)
        server.login(GMAIL_USER, GMAIL_APP_PASSWORD)
        print("✅ Logged in successfully to Gmail.\n" + "-" * 60)
    except Exception as e:
        print(f"❌ SMTP Authentication failed: {e}")
        sys.exit(1)

    sent_count = 0
    try:
        for idx, recipient in enumerate(to_send, start=1):
            name = recipient["name"]
            email = recipient["email"]
            greeting_name = name if name else "there"

            print(f"[{idx}/{len(to_send)}] Sending to: {email} (Hi {greeting_name})...")

            try:
                msg = create_mime_message(name, email)
                server.sendmail(GMAIL_USER, email, msg.as_string())
                log_sent_email(email)
                sent_count += 1
                print(f"    ✔️ Sent successfully!")
            except Exception as send_err:
                print(f"    ⚠️ Failed to send to {email}: {send_err}")
                continue

            # Random jitter wait (only if there are more emails left)
            if idx < len(to_send):
                wait_time = random.randint(MIN_DELAY_SECONDS, MAX_DELAY_SECONDS)
                print(f"    ⏳ Waiting {wait_time}s before next send (anti-spam pacing)...")
                time.sleep(wait_time)

    except KeyboardInterrupt:
        print("\n🛑 Stopped by user. Progress has been saved in sent_log.txt.")
    finally:
        try:
            server.quit()
        except:
            pass

    print("\n" + "=" * 60)
    print(f"🏁 Batch finished! Sent {sent_count} email(s) successfully.")
    remaining = total_pending - sent_count
    if remaining > 0:
        print(f"📌 {remaining} recipient(s) remaining for future batch.")
    print("=" * 60)


if __name__ == "__main__":
    main()
