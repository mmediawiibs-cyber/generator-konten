import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
    // Pastikan hanya menerima permintaan (request) yang benar
    if (req.method !== 'POST') return res.status(405).send('Metode tidak diizinkan');

    const { topik } = req.body;
    
    // Vercel akan membaca API Key secara otomatis dari Environment Variables
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    try {
        const prompt = `Berikan 5 ide konten kreatif dan menarik tentang: ${topik}`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        // Mengirimkan hasil kembali ke halaman depan
        res.status(200).json({ text: response.text() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}