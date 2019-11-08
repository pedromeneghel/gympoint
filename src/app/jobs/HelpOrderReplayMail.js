import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import Mail from '../../lib/Mail';

class HelpOrderReplayMail {
  get key() {
    return 'HelpOrderReplay';
  }

  async handle({ data }) {
    const { helpOrderData } = data;

    console.log('A fila executou');

    await Mail.sendMail({
      to: `${helpOrderData.student.name} <${helpOrderData.student.email}>`,
      subject: 'Pedido de ajuda respondido',
      template: 'helpOrderReplay',
      context: {
        name: helpOrderData.student.name,
        question: helpOrderData.question,
        answer: helpOrderData.answer,
        answer_at: format(parseISO(helpOrderData.answer_at), 'dd/MM/yyyy', {
          locale: pt,
        }),
      },
    });
  }
}

export default new HelpOrderReplayMail();
