#!/usr/bin/env python3
"""
Klar (formerly PureScan AI) - User Onboarding & Scan Enquiry Mailer
------------------------------------------------------------------
- Reaches out to newly registered users with 0 scans to discover onboarding friction.
- Plain-text / clean email formatting to feel 100% human, genuine, and developer-to-user.
- Prevents emails landing in 'Promotions' or spam tabs.
- Respects Gmail rate limits with randomized pacing and safety caps.
- Logs sent emails to `enquire_sent_log.txt` to guarantee zero duplicate sends.
- Compatible with CSV exports like `userWith0scan.csv`.
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
raw_password = os.getenv("GMAIL_APP_PASSWORD") or ENV.get("GMAIL_APP_PASSWORD", "")
GMAIL_APP_PASSWORD = raw_password.replace(" ", "").strip()

DEFAULT_CSV_FILE = "userWith0scan.csv"
LOG_FILE = "enquire_sent_log.txt"

# Anti-spam safety settings (identical to send_emails.py)
MIN_DELAY_SECONDS = 18     # Minimum pause between individual emails
MAX_DELAY_SECONDS = 35     # Maximum pause between individual emails
DEFAULT_BATCH_LIMIT = 50   # Safe cap for a single batch run

# Friendly, conversational subject line (looks like a personal email, not marketing)
SUBJECT = "Quick question about Klar"
SENDER_NAME = "Louis from Klar"


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


def build_email_content():
    """
    Creates a warm, genuine, developer-to-user enquiry email.
    Noticeably avoids marketing jargon, big graphics, or sales buttons,
    ensuring it lands in the Primary inbox and invites a real reply.
    """
    greeting = "Hi there,"

    # Plain text version (authentic, simple email)
    text_content = f"""{greeting}

I'm Louis, the developer behind Klar (formerly PureScan AI). First of all, thank you for joining!

I noticed you created your account recently, but haven't had a chance to try your first scan yet.

I just wanted to check in personally — did you run into any trouble with camera permissions, or was anything confusing when you opened the app?

If you have 10 seconds, simply hit reply and let me know. Good or bad, I read every reply myself and want to make sure you have a great experience.

Best regards,

Louis
Developer, Klar (formerly PureScan AI)
https://purescan.droploop.in
"""

    # Clean HTML version (matches native email clients like Apple Mail / Gmail)
    html_content = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #1f2937; margin: 0; padding: 12px; background-color: #ffffff;">
  <div style="max-width: 540px; margin: 0; padding: 4px 0;">
    <p style="margin: 0 0 16px 0;">{greeting}</p>

    <p style="margin: 0 0 14px 0;">
      I'm Louis, the developer behind <strong>Klar</strong> (formerly PureScan AI). First of all, thank you for joining!
    </p>

    <p style="margin: 0 0 14px 0;">
      I noticed you created your account recently, but haven't had a chance to try your first scan yet.
    </p>

    <p style="margin: 0 0 14px 0;">
      I just wanted to check in personally — <strong>did you run into any trouble opening the scanner, or was anything confusing when you set up the app?</strong>
    </p>

    <p style="margin: 0 0 18px 0;">
      If you have 10 seconds, simply hit reply and let me know. Good or bad, I read every reply myself and want to make sure everything works smoothly for you.
    </p>

    <p style="margin: 0 0 6px 0;">Best regards,</p>
    <p style="margin: 0; font-weight: 600; color: #111827;">Louis</p>
    <p style="margin: 2px 0 0 0; color: #6b7280; font-size: 13px;">
      Developer, Klar (formerly PureScan AI)<br>
      <a href="https://purescan.droploop.in" style="color: #16a34a; text-decoration: none;">purescan.droploop.in</a>
    </p>
  </div>
</body>
</html>
"""
    return text_content, html_content


def create_mime_message(email):
    """Constructs MIME multipart message with plain text and clean HTML."""
    msg = MIMEMultipart("alternative")
    msg["Subject"] = SUBJECT
    msg["From"] = f"{SENDER_NAME} <{GMAIL_USER}>"
    msg["To"] = email
    msg["Reply-To"] = GMAIL_USER

    text_body, html_body = build_email_content()
    msg.attach(MIMEText(text_body, "plain", "utf-8"))
    msg.attach(MIMEText(html_body, "html", "utf-8"))
    return msg


def get_smtp_connection(retries=3, delay=5):
    """Establishes an authenticated SSL connection to Gmail with retry logic."""
    for attempt in range(1, retries + 1):
        try:
            print(f"Connecting to smtp.gmail.com:465 (attempt {attempt}/{retries})...")
            server = smtplib.SMTP_SSL("smtp.gmail.com", 465, timeout=30)
            server.login(GMAIL_USER, GMAIL_APP_PASSWORD)
            print("✅ Logged in successfully to Gmail.\n" + "-" * 60)
            return server
        except Exception as e:
            print(f"⚠️ Connection attempt {attempt} failed: {e}")
            if attempt < retries:
                time.sleep(delay)
            else:
                raise e


# ==========================================
# MAIN EXECUTION
# ==========================================
def main():
    parser = argparse.ArgumentParser(description="Klar (PureScan AI) User Onboarding Enquiry Mailer")
    parser.add_argument("--test", type=str, help="Send one test email to specified address")
    parser.add_argument("--dry-run", action="store_true", help="Preview list of recipients without sending")
    parser.add_argument("--csv", type=str, default=DEFAULT_CSV_FILE, help=f"CSV file path (default: {DEFAULT_CSV_FILE})")
    parser.add_argument("--limit", type=int, default=DEFAULT_BATCH_LIMIT, help=f"Max emails to send this run (default: {DEFAULT_BATCH_LIMIT})")
    parser.add_argument("--all-scans", action="store_true", help="Include users even if daily_scans > 0 (default: only daily_scans == 0)")
    args = parser.parse_args()

    print("=" * 60)
    print("Klar (PureScan AI) — Zero-Scan User Enquiry Mailer")
    print("=" * 60)

    # Validate Credentials
    if not GMAIL_USER or not GMAIL_APP_PASSWORD:
        print("❌ Error: GMAIL_USER or GMAIL_APP_PASSWORD missing in .env")
        print("Please check your .env file.")
        sys.exit(1)

    print(f"📧 Sender Account: {GMAIL_USER}")
    print(f"📁 Log File:       {LOG_FILE}")
    print(f"📄 Source CSV:     {args.csv}")

    # Single Test Mode
    if args.test:
        test_email = args.test.strip()
        print(f"\n🚀 Running in TEST mode. Sending 1 email to: {test_email}")
        try:
            server = get_smtp_connection()
            msg = create_mime_message(test_email)
            server.sendmail(GMAIL_USER, test_email, msg.as_string())
            server.quit()
            print("✅ Test email sent successfully! Please check your inbox.")
        except Exception as e:
            print(f"❌ Failed to send test email: {e}")
        return

    # Load previously sent records
    sent_emails = load_sent_emails()
    print(f"📋 Found {len(sent_emails)} already contacted user(s) in {LOG_FILE}.")

    # Load recipients from CSV
    if not os.path.exists(args.csv):
        print(f"❌ Error: CSV file '{args.csv}' not found!")
        sys.exit(1)

    pending_recipients = []
    skipped_has_scans = 0

    with open(args.csv, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            email = row.get("email", "").strip()
            if not email:
                continue

            # Check scan count
            raw_scans = row.get("daily_scans", "0")
            raw_xp = row.get("level_xp", "0")
            try:
                scans = int(raw_scans) if raw_scans else 0
            except ValueError:
                scans = 0

            try:
                xp = int(raw_xp) if raw_xp else 0
            except ValueError:
                xp = 0

            # Unless --all-scans is passed, only target users who truly have 0 scans & 0 XP
            if not args.all_scans and (scans > 0 or xp > 0):
                skipped_has_scans += 1
                continue

            if email.lower() not in sent_emails:
                pending_recipients.append({
                    "email": email,
                    "created_at": row.get("created_at", "").split(" ")[0],
                    "daily_scans": scans
                })

    print(f"🔍 Filtered out {skipped_has_scans} user(s) who already had >= 1 scan.")
    total_pending = len(pending_recipients)
    print(f"📬 Pending zero-scan recipients: {total_pending}")

    if total_pending == 0:
        print("🎉 No pending zero-scan users need to be contacted right now! All done.")
        return

    # Dry Run Mode
    if args.dry_run:
        print("\n🔍 DRY RUN PREVIEW (No emails will be sent):")
        preview_count = min(total_pending, args.limit)
        for i, item in enumerate(pending_recipients[:preview_count], 1):
            print(f"  {i}. {item['email']} (Joined: {item['created_at']}, Scans: {item['daily_scans']})")
        if total_pending > preview_count:
            print(f"  ... and {total_pending - preview_count} more pending.")
        print(f"\nBatch limit: {args.limit} | Total pending: {total_pending}")
        print("\nTo start sending real emails, run:")
        print(f"  python3 enquire_email.py --limit {args.limit}")
        return

    # Apply safe batch limit
    to_send = pending_recipients[:args.limit]
    print(f"\n🚀 Preparing to send batch of {len(to_send)} email(s).")
    print(f"⏱️  Pacing delay: {MIN_DELAY_SECONDS}s to {MAX_DELAY_SECONDS}s randomized between sends.\n")

    start_time = time.time()

    # Connect to SMTP initial
    try:
        server = get_smtp_connection()
    except Exception as e:
        print(f"❌ Initial SMTP Authentication failed: {e}")
        sys.exit(1)

    sent_count = 0
    try:
        for idx, recipient in enumerate(to_send, start=1):
            email = recipient["email"]

            print(f"[{idx}/{len(to_send)}] Sending enquiry to: {email}...")

            # Check / ensure connection is healthy before sending
            try:
                if server is None:
                    server = get_smtp_connection()
                else:
                    status = server.noop()[0]
                    if status != 250:
                        server = get_smtp_connection()
            except Exception:
                try:
                    server = get_smtp_connection()
                except Exception as reconn_err:
                    print(f"    ⚠️ Could not reconnect to Gmail SMTP: {reconn_err}")
                    continue

            # Attempt sending with 1 automatic retry on disconnect
            send_success = False
            for attempt in range(2):
                try:
                    msg = create_mime_message(email)
                    server.sendmail(GMAIL_USER, email, msg.as_string())
                    log_sent_email(email)
                    sent_count += 1
                    print(f"    ✔️ Sent successfully!")
                    send_success = True
                    break
                except Exception as send_err:
                    print(f"    ⚠️ Send attempt {attempt + 1} failed: {send_err}")
                    if attempt == 0:
                        print("    🔄 Reconnecting to Gmail SMTP and retrying...")
                        time.sleep(3)
                        try:
                            server = get_smtp_connection()
                        except Exception as e:
                            print(f"    ⚠️ Reconnection failed: {e}")
                            break

            if not send_success:
                print(f"    ❌ Skipped {email} due to error (will be retried on next run).")

            # Random jitter wait (only if there are more emails left)
            if idx < len(to_send):
                wait_time = random.randint(MIN_DELAY_SECONDS, MAX_DELAY_SECONDS)
                print(f"    ⏳ Waiting {wait_time}s before next send (anti-spam pacing)...")
                time.sleep(wait_time)

    except KeyboardInterrupt:
        elapsed = int(time.time() - start_time)
        m, s = divmod(elapsed, 60)
        h, m = divmod(m, 60)
        time_str = f"{h}h {m}m {s}s" if h else (f"{m}m {s}s" if m else f"{s}s")
        print(f"\n🛑 Stopped by user after {time_str}. Progress has been saved in {LOG_FILE}.")
    finally:
        if server:
            try:
                server.quit()
            except Exception:
                pass

    elapsed = int(time.time() - start_time)
    m, s = divmod(elapsed, 60)
    h, m = divmod(m, 60)
    time_str = f"{h}h {m}m {s}s" if h else (f"{m}m {s}s" if m else f"{s}s")

    print("\n" + "=" * 60)
    print(f"🏁 Batch finished! Sent {sent_count} enquiry email(s) successfully.")
    print(f"⏱️  Total time taken: {time_str}")
    remaining = total_pending - sent_count
    if remaining > 0:
        print(f"📌 {remaining} zero-scan recipient(s) remaining for future batch.")
    print("=" * 60)


if __name__ == "__main__":
    main()
