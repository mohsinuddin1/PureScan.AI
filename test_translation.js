import { translate } from '@vitalets/google-translate-api';

async function testTranslation() {
    const text = "Why should you avoid ultra-processed foods (NOVA Group 4)?";
    try {
        const res = await translate(text, { to: 'es' });
        console.log("Translation:", res.text);
    } catch (e) {
        console.error("Error:", e);
    }
}

testTranslation();
