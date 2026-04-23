const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('./html'));

// Configurar transporter de email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD
    }
});

// Rota para enviar formulário
app.post('/api/enviar-formulario', async (req, res) => {
    try {
        const { nome, email, telefone, servico, mensagem, clinicaEmail } = req.body;

        // Formatar mensagem para envio
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: clinicaEmail,
            subject: `Novo Contato - ${nome}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333; border-bottom: 2px solid #6b4c9a; padding-bottom: 10px;">
                        📬 NOVO FORMULÁRIO DE CONTATO
                    </h2>
                    
                    <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #6b4c9a; margin-top: 0;">Dados do Cliente:</h3>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr style="background-color: #fff;">
                                <td style="padding: 10px; font-weight: bold; color: #333; width: 30%;">Nome:</td>
                                <td style="padding: 10px; color: #555;">${nome}</td>
                            </tr>
                            <tr style="background-color: #fafafa;">
                                <td style="padding: 10px; font-weight: bold; color: #333;">Email:</td>
                                <td style="padding: 10px; color: #555;">${email}</td>
                            </tr>
                            <tr style="background-color: #fff;">
                                <td style="padding: 10px; font-weight: bold; color: #333;">Telefone:</td>
                                <td style="padding: 10px; color: #555;">${telefone}</td>
                            </tr>
                            <tr style="background-color: #fafafa;">
                                <td style="padding: 10px; font-weight: bold; color: #333;">Serviço:</td>
                                <td style="padding: 10px; color: #555;">${traduzirServico(servico)}</td>
                            </tr>
                        </table>
                    </div>

                    <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #6b4c9a; margin: 20px 0;">
                        <h3 style="color: #6b4c9a; margin-top: 0;">Mensagem:</h3>
                        <p style="color: #555; line-height: 1.6;">${mensagem.replace(/\n/g, '<br>')}</p>
                    </div>

                    <div style="border-top: 1px solid #ddd; padding-top: 15px; margin-top: 20px; font-size: 12px; color: #999;">
                        <p>Data/Hora: ${new Date().toLocaleString('pt-BR')}</p>
                        <p>Este formulário foi enviado através do site da Harmonia Terapias</p>
                    </div>
                </div>
            `
        };

        // Enviar email para a clínica
        await transporter.sendMail(mailOptions);

        // Enviar confirmação para o cliente
        const confirmacaoOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: '✅ Recebemos sua mensagem - Harmonia Terapias',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #6b4c9a;">Obrigado por entrar em contato! 💚</h2>
                    
                    <p style="color: #555; line-height: 1.6;">
                        Olá <strong>${nome}</strong>,
                    </p>
                    
                    <p style="color: #555; line-height: 1.6;">
                        Recebemos sua mensagem com sucesso e entraremos em contato em breve através do número 
                        <strong>(32) 999789647</strong> ou via email.
                    </p>

                    <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #6b4c9a; margin-top: 0;">Seus Dados:</h3>
                        <ul style="color: #555;">
                            <li><strong>Nome:</strong> ${nome}</li>
                            <li><strong>Email:</strong> ${email}</li>
                            <li><strong>Telefone:</strong> ${telefone}</li>
                            <li><strong>Serviço de Interesse:</strong> ${traduzirServico(servico)}</li>
                        </ul>
                    </div>

                    <p style="color: #555; line-height: 1.6;">
                        Em caso de dúvidas, não hesite em nos contatar:
                    </p>
                    <ul style="color: #555;">
                        <li>📞 <strong>Telefone:</strong> (32) 999789647</li>
                        <li>💬 <strong>WhatsApp:</strong> (32) 999789647</li>
                        <li>✉️ <strong>Email:</strong> contatoharmoniaterapias20@gmail.com</li>
                    </ul>

                    <p style="color: #999; font-size: 12px; border-top: 1px solid #ddd; padding-top: 15px; margin-top: 20px;">
                        Harmonia Terapias - Cuidando de você com amor e dedicação 💚
                    </p>
                </div>
            `
        };

        await transporter.sendMail(confirmacaoOptions);

        res.json({ 
            success: true, 
            message: 'Formulário enviado com sucesso!' 
        });
    } catch (error) {
        console.error('Erro ao enviar email:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Erro ao processar formulário',
            error: error.message 
        });
    }
});

function traduzirServico(servico) {
    const servicos = {
        'yoga': 'Yoga Terapêutico',
        'massagem': 'Massagem Terapêutica',
        'terapia': 'Terapia Cognitiva',
        'reiki': 'Reiki',
        'aromaterapia': 'Aromaterapia',
        'musicoterapia': 'Musicoterapia',
        'outro': 'Outro'
    };
    return servicos[servico] || servico;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});
