import { MailtrapClient } from "mailtrap"

export const sendEmail = async (to: string, subject: string, text: string)=> {
    const mailtrap = new MailtrapClient({
        token: process.env.MAILTRAP_TOKEN as string,
        testInboxId: 4069716
    })

    try {
        await mailtrap.send({
            from: {name: 'system',email: 'system@gmail.com'},
            to: [{email: to}],
            subject,
            text
        })
        return true
    } catch (error) {
        return false
    }
}