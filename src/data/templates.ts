import { Calendar, Briefcase, FileText, Edit3, MapPin } from 'lucide-react';
import { Template } from '../types';
import { uiTranslations } from './i18n';

export const documentTemplates: Record<string, Template[]> = {
  'es': [
    {
      id: 'baja_voluntaria',
      name: 'Baja Voluntaria',
      title: 'Comunicación de Baja Voluntaria',
      recipient: 'A la atención del Departamento de Recursos Humanos de',
      fields: ['lastDay'],
      bodyText: 'Por medio de la presente, me dirijo a ustedes para comunicarles formalmente mi decisión de dar por finalizada la relación laboral que mantengo con la empresa.\n\nEsta decisión se hará efectiva el próximo día {{lastDay}}, cumpliendo así con el plazo de preaviso establecido en la normativa aplicable.\n\nLes ruego que tengan preparada para esa fecha la propuesta de liquidación, saldo y finiquito, así como el certificado de empresa y cualquier otra documentación necesaria para la gestión de este trámite.\n\nAprovecho la ocasión para agradecerles sinceramente la confianza depositada en mí durante todo este tiempo y la oportunidad de haber formado parte de este equipo. Ha sido una experiencia muy enriquecedora para mi desarrollo profesional.\n\nQuedo a su entera disposición para facilitar una transición ordenada de mis responsabilidades y asegurar el correcto traspaso de mis tareas.'
    },
    {
      id: 'excedencia',
      name: 'Solicitud de Excedencia',
      title: 'Solicitud de Excedencia Voluntaria',
      recipient: 'A la atención de la Dirección de',
      fields: ['startDate', 'endDate'],
      bodyText: 'Mediante este escrito, y de acuerdo con lo establecido en el Estatuto de los Trabajadores y el convenio colectivo de aplicación, me pongo en contacto con ustedes para solicitar el reconocimiento de mi derecho a disfrutar de una excedencia voluntaria.\n\nMi intención es que dicha excedencia comience el próximo día {{startDate}} y tenga una duración hasta el día {{endDate}}, ambos inclusive.\n\nLes agradecería enormemente que me confirmasen la aprobación de esta solicitud a la mayor brevedad posible, devolviéndome una copia de este escrito firmada y sellada en señal de conformidad, para poder organizar los detalles con antelación.\n\nAgradezco de antemano su comprensión y todas las facilidades prestadas por la empresa.'
    },
    {
      id: 'reduccion_jornada',
      name: 'Reducción de Jornada',
      title: 'Solicitud de Reducción de Jornada',
      recipient: 'A la atención del Departamento de Recursos Humanos de',
      fields: ['startDate', 'newSchedule'],
      bodyText: 'Por medio del presente escrito, y conforme a lo dispuesto en la normativa laboral vigente, me dirijo a ustedes para comunicarles mi intención de ejercer mi derecho a la reducción de jornada laboral por motivos de conciliación y guarda legal.\n\nMi propuesta es que esta reducción de jornada se haga efectiva a partir del día {{startDate}}, pasando a realizar el siguiente horario: {{newSchedule}}.\n\nHe intentado plantear este nuevo horario de la manera que considere menos perjudicial para el normal funcionamiento de la empresa, esperando que se ajuste a las necesidades de ambas partes.\n\nAgradezco profundamente su disposición y quedo a la espera de su confirmación para formalizar este acuerdo.'
    },
    {
      id: 'cambio_cuenta',
      name: 'Cambio de Cuenta Bancaria',
      title: 'Comunicación de Cambio de Cuenta',
      recipient: 'A la atención del Departamento de Nóminas de',
      fields: ['bankName', 'iban'],
      bodyText: 'A través de esta comunicación, les informo de mi deseo de modificar la cuenta bancaria en la que actualmente se me está realizando el ingreso de mi nómina mensual y cualquier otro devengo.\n\nA partir de la fecha de hoy, les ruego que los próximos abonos se realicen en la cuenta de la entidad {{bankName}}, con el siguiente número IBAN: {{iban}}.\n\nLes agradezco de antemano las gestiones necesarias para actualizar estos datos en el sistema de nóminas.\n\nQuedo a su entera disposición por si precisaran de alguna documentación adicional para procesar este cambio con la mayor diligencia posible.'
    },
    {
      id: 'vacaciones',
      name: 'Solicitud de Vacaciones',
      title: 'Solicitud de Vacaciones',
      recipient: 'A la atención de mi Responsable en',
      fields: ['startDate', 'endDate'],
      bodyText: 'Por medio de la presente, me dirijo a ustedes para solicitar formalmente el disfrute de parte de mis días de vacaciones correspondientes al periodo anual en curso.\n\nMe gustaría poder disfrutar de este periodo de descanso desde el día {{startDate}} hasta el día {{endDate}}, ambos inclusive, reincorporándome a mi puesto de trabajo el siguiente día laborable.\n\nHe revisado el calendario del equipo para asegurar que mi ausencia no cause inconvenientes mayores, y dejaré todos mis asuntos organizados antes de mi salida.\n\nLes agradecería que me confirmasen la aprobación de esta solicitud cuando les sea posible. Muchas gracias por su tiempo y consideración.'
    },
    {
      id: 'teletrabajo',
      name: 'Solicitud de Teletrabajo',
      title: 'Solicitud de Teletrabajo',
      recipient: 'A la atención de la Dirección / Recursos Humanos de',
      fields: ['startDate'],
      bodyText: 'Por medio de la presente, me dirijo a ustedes para solicitar formalmente acogerme a la modalidad de trabajo a distancia (teletrabajo), conforme a lo previsto en la legislación vigente y en el convenio colectivo aplicable.\n\nMi propuesta es que esta modalidad se inicie a partir del día {{startDate}}, bajo las condiciones y distribución de jornada que acordemos conjuntamente para asegurar el correcto desempeño de mis funciones.\n\nQuedo a su entera disposición para reunirnos, evaluar esta solicitud y redactar el correspondiente acuerdo de trabajo a distancia.\n\nAgradezco de antemano su atención y disposición.'
    },
    {
      id: 'cambio_domicilio',
      name: 'Cambio de Domicilio',
      title: 'Comunicación de Cambio de Domicilio',
      recipient: 'A la atención del Departamento de Recursos Humanos de',
      fields: ['newAddress'],
      bodyText: 'A través de este escrito, les comunico formalmente que he cambiado mi lugar de residencia.\n\nA partir de este momento, ruego que actualicen mis datos en su base de datos para cualquier notificación o correspondencia oficial. Mi nueva dirección postal es: {{newAddress}}.\n\nQuedo a su disposición si necesitaran algún comprobante o documentación adicional (como un certificado de empadronamiento) para formalizar este cambio en sus registros.\n\nMuchas gracias por su gestión.'
    },
    {
      id: 'anticipo_nomina',
      name: 'Anticipo de Nómina',
      title: 'Solicitud de Anticipo de Nómina',
      recipient: 'A la atención del Departamento de Nóminas de',
      fields: ['amount', 'reason'],
      bodyText: 'Mediante la presente, y conforme a lo estipulado en el Estatuto de los Trabajadores y nuestro convenio colectivo, me pongo en contacto con ustedes para solicitar un anticipo sobre la nómina del mes en curso correspondiente al trabajo ya realizado.\n\nEl importe que solicito es de {{amount}}, motivado por {{reason}}.\n\nLes ruego que, si la solicitud es aprobada, el ingreso se realice en la cuenta bancaria donde habitualmente percibo mi salario.\n\nAgradezco enormemente su comprensión y la rapidez en la gestión de esta petición.'
    },
    {
      id: 'permiso_matrimonio',
      name: 'Permiso por Matrimonio',
      title: 'Permiso Retribuido por Matrimonio',
      recipient: 'A la atención del Departamento de Recursos Humanos de',
      fields: ['marriageDate', 'startDate', 'endDate'],
      bodyText: 'Por medio de la presente comunicación, les informo de mi próximo enlace matrimonial, que tendrá lugar el día {{marriageDate}}.\n\nPor este motivo, y de acuerdo con lo establecido en el Estatuto de los Trabajadores y el convenio colectivo de aplicación, les comunico que haré uso del permiso retribuido correspondiente, ausentándome de mi puesto de trabajo desde el día {{startDate}} hasta el día {{endDate}}, ambos inclusive.\n\nA mi regreso, les facilitaré el correspondiente certificado o libro de familia para justificar este permiso.\n\nAgradezco de antemano su atención y quedo a su disposición para dejar mis tareas debidamente organizadas antes de mi ausencia.'
    }
  ],
  'en-GB': [
    {
      id: 'baja_voluntaria',
      name: 'Resignation Notice',
      title: 'Formal Notification of Resignation',
      recipient: 'For the attention of the Human Resources Department at',
      fields: ['lastDay'],
      bodyText: 'Please accept this letter as formal notification that I am resigning from my position with the company.\n\nMy last day of employment will be {{lastDay}}, in accordance with the notice period set out in my contract of employment.\n\nPlease let me know the arrangements for handing over my responsibilities and returning any company property. I would be grateful if you could also confirm the details of my final pay, including any accrued holiday pay, and arrange for my P45 to be forwarded to me.\n\nI would like to take this opportunity to thank you for the support and opportunities I have received during my time with the company. I wish you and the team all the best for the future.'
    },
    {
      id: 'excedencia',
      name: 'Sabbatical Request',
      title: 'Request for Sabbatical / Unpaid Leave',
      recipient: 'For the attention of the Management at',
      fields: ['startDate', 'endDate'],
      bodyText: 'I am writing to formally request a period of unpaid leave / sabbatical, in accordance with the company\'s flexible working policies.\n\nI would like to request that my leave commences on {{startDate}} and concludes on {{endDate}} inclusive.\n\nI would be grateful if we could discuss this request further at your earliest convenience to ensure a smooth handover of my current projects and responsibilities.\n\nThank you for considering my request.'
    },
    {
      id: 'reduccion_jornada',
      name: 'Reduced Hours',
      title: 'Flexible Working Request (Reduced Hours)',
      recipient: 'For the attention of the Human Resources Department at',
      fields: ['startDate', 'newSchedule'],
      bodyText: 'I am writing to make a statutory flexible working request, to reduce my working hours to accommodate my personal circumstances.\n\nI would like to request that my new working pattern be {{newSchedule}}, effective from {{startDate}}.\n\nI have carefully considered the potential impact of this change on the business and my colleagues, and I am committed to working with you to ensure a seamless transition.\n\nI look forward to discussing this request with you.'
    },
    {
      id: 'cambio_cuenta',
      name: 'Change of Bank Details',
      title: 'Notification of Change of Bank Details',
      recipient: 'For the attention of the Payroll Department at',
      fields: ['bankName', 'iban'],
      bodyText: 'Please be advised that my bank account details for payroll purposes have changed.\n\nWith effect from today, I would be grateful if all future salary payments and expenses could be credited to my new account held with {{bankName}}, using the following IBAN/Account Number: {{iban}}.\n\nPlease let me know if you require any further documentation to process this change.'
    },
    {
      id: 'vacaciones',
      name: 'Annual Leave',
      title: 'Annual Leave Request',
      recipient: 'For the attention of my Line Manager at',
      fields: ['startDate', 'endDate'],
      bodyText: 'I am writing to request annual leave from my statutory and contractual entitlement for the current holiday year.\n\nI would like to request time off starting on {{startDate}} and returning to work on the first working day following {{endDate}}.\n\nI have checked with my team to ensure adequate cover during my absence, and I will ensure all urgent matters are dealt with prior to my departure.\n\nI look forward to your confirmation.'
    },
    {
      id: 'teletrabajo',
      name: 'Remote Working',
      title: 'Flexible Working Request (Remote Working)',
      recipient: 'For the attention of the Management / HR at',
      fields: ['startDate'],
      bodyText: 'I am writing to formally request a flexible working arrangement to allow me to work remotely.\n\nI propose that this arrangement begins on {{startDate}}. We can discuss and agree upon the specific days and core working hours to ensure business continuity and team collaboration.\n\nI believe this arrangement will enhance my productivity while maintaining the high standard of work expected of me. I am happy to trial this arrangement if necessary.\n\nThank you for your time and consideration.'
    },
    {
      id: 'cambio_domicilio',
      name: 'Change of Address',
      title: 'Notification of Change of Address',
      recipient: 'For the attention of the Human Resources Department at',
      fields: ['newAddress'],
      bodyText: 'Please accept this letter as formal notification of a change to my residential address.\n\nMy new permanent address for all official correspondence and payroll records is: {{newAddress}}.\n\nPlease update your records accordingly. Should you require any proof of address, please let me know.'
    },
    {
      id: 'anticipo_nomina',
      name: 'Salary Advance',
      title: 'Request for Salary Advance',
      recipient: 'For the attention of the Payroll Department at',
      fields: ['amount', 'reason'],
      bodyText: 'I am writing to respectfully request a salary advance against my earnings for the current pay period.\n\nI would like to request an advance of {{amount}} due to {{reason}}.\n\nIf approved, I authorise the company to deduct this amount from my upcoming salary payment. I would be grateful if the funds could be transferred to my nominated salary bank account.\n\nThank you for your understanding and assistance.'
    },
    {
      id: 'permiso_matrimonio',
      name: 'Marriage Leave',
      title: 'Special Leave Request (Marriage)',
      recipient: 'For the attention of the Human Resources Department at',
      fields: ['marriageDate', 'startDate', 'endDate'],
      bodyText: 'I am writing to formally notify you of my upcoming marriage, which is scheduled to take place on {{marriageDate}}.\n\nIn accordance with statutory entitlements and company policy regarding special leave, I would like to request marriage leave starting on {{startDate}} and ending on {{endDate}} inclusive.\n\nI will provide a copy of the marriage certificate upon my return for your records. I will ensure my tasks are handed over appropriately prior to my leave.\n\nThank you for your support.'
    }
  ],
  'en-US': [
    {
      id: 'baja_voluntaria',
      name: 'Resignation Notice',
      title: 'Formal Notice of Resignation',
      recipient: 'To the Human Resources Department at',
      fields: ['lastDay'],
      bodyText: 'Please accept this letter as formal notification that I am resigning from my position with the company.\n\nMy last day of employment will be {{lastDay}}, which fulfills the standard notice period.\n\nPlease let me know the process for transitioning my responsibilities and returning company equipment. I would also appreciate information regarding my final paycheck and any accrued PTO payout.\n\nThank you for the opportunities for professional and personal development during my time here. I wish the company continued success.'
    },
    {
      id: 'excedencia',
      name: 'Leave of Absence',
      title: 'Leave of Absence Request',
      recipient: 'To Management at',
      fields: ['startDate', 'endDate'],
      bodyText: 'I am writing to formally request a personal leave of absence.\n\nI would like to request that my leave begins on {{startDate}} and ends on {{endDate}} inclusive.\n\nI am happy to discuss how my duties will be covered during my absence to ensure the team is supported.\n\nThank you in advance for your consideration.'
    },
    {
      id: 'reduccion_jornada',
      name: 'Reduced Schedule',
      title: 'Request for Reduced Schedule',
      recipient: 'To the Human Resources Department at',
      fields: ['startDate', 'newSchedule'],
      bodyText: 'I am writing to request a modification to my current work schedule.\n\nI would like to transition to a reduced hours schedule of {{newSchedule}}, effective {{startDate}}.\n\nI am committed to ensuring that my core responsibilities are met and am open to discussing how we can make this arrangement work for both the team and myself.\n\nThank you for your time and consideration.'
    },
    {
      id: 'cambio_cuenta',
      name: 'Direct Deposit Update',
      title: 'Direct Deposit Update Request',
      recipient: 'To the Payroll Department at',
      fields: ['bankName', 'iban'],
      bodyText: 'Please accept this written authorization to update my direct deposit information for payroll purposes.\n\nEffective immediately, please route my paychecks to my new account at {{bankName}}. The Routing and Account information is: {{iban}}.\n\nPlease let me know if you need me to submit a new direct deposit form or voided check.'
    },
    {
      id: 'vacaciones',
      name: 'PTO Request',
      title: 'PTO / Vacation Request',
      recipient: 'To my Manager at',
      fields: ['startDate', 'endDate'],
      bodyText: 'I am submitting this formal request to use my accrued Paid Time Off (PTO).\n\nI am requesting time off starting on {{startDate}} through {{endDate}} inclusive.\n\nI will ensure my current projects are up to date and that my team is informed of my absence.\n\nPlease let me know if this request is approved.'
    },
    {
      id: 'teletrabajo',
      name: 'Telecommuting',
      title: 'Telecommuting / Remote Work Request',
      recipient: 'To Management / HR at',
      fields: ['startDate'],
      bodyText: 'I am writing to request a telecommuting arrangement.\n\nI would like to propose working remotely starting on {{startDate}}. I am confident that I can maintain my current level of productivity and responsiveness from my home office.\n\nI am open to discussing the details of this arrangement, including communication expectations and core hours.\n\nThank you for considering my request.'
    },
    {
      id: 'cambio_domicilio',
      name: 'Change of Address',
      title: 'Change of Address Notification',
      recipient: 'To the Human Resources Department at',
      fields: ['newAddress'],
      bodyText: 'This letter is to inform you of a change to my primary residential address.\n\nMy new mailing address for all tax, benefits, and official company correspondence is: {{newAddress}}.\n\nPlease update my file in the HR and payroll systems.'
    },
    {
      id: 'anticipo_nomina',
      name: 'Payroll Advance',
      title: 'Payroll Advance Request',
      recipient: 'To the Payroll Department at',
      fields: ['amount', 'reason'],
      bodyText: 'I am writing to request a payroll advance for the current pay cycle.\n\nI am requesting an advance in the amount of {{amount}} due to {{reason}}.\n\nI authorize the company to deduct this advance from my next scheduled paycheck. I appreciate your understanding and assistance with this matter.'
    },
    {
      id: 'permiso_matrimonio',
      name: 'Time Off (Wedding)',
      title: 'Time Off Request (Wedding)',
      recipient: 'To the Human Resources Department at',
      fields: ['marriageDate', 'startDate', 'endDate'],
      bodyText: 'I am writing to inform you of my upcoming wedding on {{marriageDate}}.\n\nI would like to request time off for this occasion, beginning on {{startDate}} and returning to work after {{endDate}}.\n\nI will ensure that all my responsibilities are appropriately delegated before my departure.\n\nThank you for your support and understanding.'
    }
  ],
  'de': [
    {
      id: 'baja_voluntaria',
      name: 'Kündigung',
      title: 'Kündigung des Arbeitsverhältnisses',
      recipient: 'An die Personalabteilung von',
      fields: ['lastDay'],
      bodyText: 'Sehr geehrte Damen und Herren,\n\nhiermit kündige ich mein Arbeitsverhältnis ordentlich und fristgerecht zum {{lastDay}}.\n\nBitte bestätigen Sie mir den Erhalt dieser Kündigung sowie das Beendigungsdatum schriftlich. Ich bitte außerdem um die Erstellung eines qualifizierten Arbeitszeugnisses und die Zusendung meiner Arbeitspapiere sowie der finalen Gehaltsabrechnung.\n\nIch danke Ihnen für die gute Zusammenarbeit und die wertvollen Erfahrungen, die ich in Ihrem Unternehmen sammeln durfte. Für die verbleibende Zeit stehe ich selbstverständlich zur Verfügung, um eine reibungslose Übergabe meiner Aufgaben zu gewährleisten.'
    },
    {
      id: 'excedencia',
      name: 'Unbezahlter Urlaub',
      title: 'Antrag auf unbezahlten Urlaub / Freistellung',
      recipient: 'An die Geschäftsführung von',
      fields: ['startDate', 'endDate'],
      bodyText: 'Sehr geehrte Damen und Herren,\n\nhiermit beantrage ich offiziell einen unbezahlten Urlaub / eine Freistellung von der Arbeit.\n\nIch bitte darum, den unbezahlten Urlaub im Zeitraum vom {{startDate}} bis einschließlich {{endDate}} zu gewähren.\n\nGerne stehe ich für ein Gespräch zur Verfügung, um die Übergabe meiner Aufgaben während meiner Abwesenheit zu planen.\n\nVielen Dank im Voraus für Ihr Verständnis und die Prüfung meines Anliegens.'
    },
    {
      id: 'reduccion_jornada',
      name: 'Teilzeitantrag',
      title: 'Antrag auf Teilzeitbeschäftigung',
      recipient: 'An die Personalabteilung von',
      fields: ['startDate', 'newSchedule'],
      bodyText: 'Sehr geehrte Damen und Herren,\n\ngemäß § 8 des Teilzeit- und Befristungsgesetzes (TzBfG) beantrage ich hiermit die Verringerung meiner vertraglich vereinbarten Arbeitszeit.\n\nIch möchte meine Arbeitszeit ab dem {{startDate}} wie folgt anpassen: {{newSchedule}}.\n\nIch bin davon überzeugt, dass diese Anpassung betriebliche Abläufe nicht beeinträchtigt und freue mich auf ein Gespräch zur konkreten Ausgestaltung.\n\nVielen Dank für Ihre Bemühungen.'
    },
    {
      id: 'cambio_cuenta',
      name: 'Bankverbindung',
      title: 'Änderung der Bankverbindung',
      recipient: 'An die Gehaltsabrechnungsabteilung von',
      fields: ['bankName', 'iban'],
      bodyText: 'Sehr geehrte Damen und Herren,\n\nhiermit teile ich Ihnen meine neue Bankverbindung für die Überweisung meines Gehalts mit.\n\nBitte überweisen Sie mein Gehalt ab sofort auf folgendes Konto bei der {{bankName}}: IBAN {{iban}}.\n\nIch bitte um eine kurze Bestätigung, dass die Änderung in Ihren Systemen hinterlegt wurde.'
    },
    {
      id: 'vacaciones',
      name: 'Urlaubsantrag',
      title: 'Urlaubsantrag',
      recipient: 'An meinen Vorgesetzten bei',
      fields: ['startDate', 'endDate'],
      bodyText: 'Sehr geehrte Damen und Herren,\n\nhiermit beantrage ich Erholungsurlaub.\n\nIch möchte meinen Urlaub in der Zeit vom {{startDate}} bis einschließlich {{endDate}} nehmen.\n\nDie Vertretung für diesen Zeitraum ist bereits mit meinem Team intern abgestimmt, sodass keine betrieblichen Abläufe gestört werden.\n\nIch bitte um zeitnahe Prüfung und Genehmigung meines Antrags.'
    },
    {
      id: 'teletrabajo',
      name: 'Homeoffice',
      title: 'Antrag auf Homeoffice / Mobiles Arbeiten',
      recipient: 'An die Geschäftsführung / Personalabteilung von',
      fields: ['startDate'],
      bodyText: 'Sehr geehrte Damen und Herren,\n\nhiermit beantrage ich die Möglichkeit, im Homeoffice bzw. mobil zu arbeiten.\n\nIch schlage vor, diese Regelung ab dem {{startDate}} zu beginnen. Gerne können wir die genaue Verteilung der Präsenz- und Homeoffice-Tage gemeinsam festlegen.\n\nIch bin mir sicher, dass ich meine Aufgaben auch von zu Hause aus effizient und in der gewohnten Qualität erledigen kann.\n\nVielen Dank für die Berücksichtigung meines Anliegens.'
    },
    {
      id: 'cambio_domicilio',
      name: 'Adressänderung',
      title: 'Mitteilung über Adressänderung',
      recipient: 'An die Personalabteilung von',
      fields: ['newAddress'],
      bodyText: 'Sehr geehrte Damen und Herren,\n\nhiermit informiere ich Sie über meine neue Wohnanschrift.\n\nBitte aktualisieren Sie meine Daten in der Personalakte. Meine neue Adresse lautet ab sofort: {{newAddress}}.\n\nSollten Sie weitere Nachweise benötigen, lassen Sie es mich bitte wissen.'
    },
    {
      id: 'anticipo_nomina',
      name: 'Gehaltsvorschuss',
      title: 'Antrag auf Gehaltsvorschuss',
      recipient: 'An die Gehaltsabrechnungsabteilung von',
      fields: ['amount', 'reason'],
      bodyText: 'Sehr geehrte Damen und Herren,\n\nhiermit bitte ich um die Gewährung eines Gehaltsvorschusses.\n\nAufgrund von {{reason}} benötige ich einen Vorschuss in Höhe von {{amount}}.\n\nIch erkläre mich damit einverstanden, dass dieser Betrag bei der nächsten regulären Gehaltsabrechnung einbehalten bzw. nach individueller Vereinbarung verrechnet wird.\n\nIch bedanke mich im Voraus für Ihre Unterstützung.'
    },
    {
      id: 'permiso_matrimonio',
      name: 'Sonderurlaub Heirat',
      title: 'Antrag auf Sonderurlaub (Eheschließung)',
      recipient: 'An die Personalabteilung von',
      fields: ['marriageDate', 'startDate', 'endDate'],
      bodyText: 'Sehr geehrte Damen und Herren,\n\nhiermit informiere ich Sie über meine bevorstehende Eheschließung am {{marriageDate}}.\n\nAus diesem Anlass beantrage ich den mir tariflich bzw. gesetzlich zustehenden Sonderurlaub für die Zeit vom {{startDate}} bis einschließlich {{endDate}}.\n\nEine Kopie der Heiratsurkunde werde ich Ihnen nach meiner Rückkehr selbstverständlich nachreichen.\n\nVielen Dank.'
    }
  ],
  'fr': [
    {
      id: 'baja_voluntaria',
      name: 'Démission',
      title: 'Lettre de démission',
      recipient: 'À l\'attention du Département des Ressources Humaines de',
      fields: ['lastDay'],
      bodyText: 'Madame, Monsieur,\n\nPar la présente, je vous informe de ma décision de démissionner de mes fonctions que j\'occupe au sein de votre entreprise.\n\nComme le prévoit mon contrat de travail et la convention collective applicable, je respecterai un préavis qui prendra fin le {{lastDay}}.\n\nÀ l\'issue de ce préavis, je vous saurai gré de bien vouloir me remettre mon certificat de travail, mon reçu pour solde de tout compte ainsi que mon attestation Pôle emploi.\n\nJe tiens à vous remercier pour les opportunités professionnelles qui m\'ont été accordées au cours de ma collaboration au sein de votre entreprise.'
    },
    {
      id: 'excedencia',
      name: 'Congé sans solde',
      title: 'Demande de congé sans solde / sabbatique',
      recipient: 'À l\'attention de la Direction de',
      fields: ['startDate', 'endDate'],
      bodyText: 'Madame, Monsieur,\n\nPar la présente, je sollicite votre accord pour bénéficier d\'un congé sans solde (ou congé sabbatique).\n\nJe souhaiterais que ce congé débute le {{startDate}} pour se terminer le {{endDate}} inclus.\n\nJe me tiens à votre entière disposition pour convenir d\'un entretien afin d\'organiser au mieux mon absence et la passation de mes dossiers.\n\nDans l\'attente de votre accord, je vous prie d\'agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.'
    },
    {
      id: 'reduccion_jornada',
      name: 'Temps partiel',
      title: 'Demande de passage à temps partiel',
      recipient: 'À l\'attention du Département des Ressources Humaines de',
      fields: ['startDate', 'newSchedule'],
      bodyText: 'Madame, Monsieur,\n\nConformément aux dispositions du Code du travail, je vous adresse par la présente une demande de passage à temps partiel.\n\nJe souhaiterais que cette modification de mon temps de travail soit effective à partir du {{startDate}}, avec les horaires suivants : {{newSchedule}}.\n\nJe suis convaincu(e) que nous pourrons trouver une organisation satisfaisante pour le bon fonctionnement du service.\n\nJe vous prie d\'agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.'
    },
    {
      id: 'cambio_cuenta',
      name: 'Coordonnées bancaires',
      title: 'Changement de coordonnées bancaires',
      recipient: 'À l\'attention du Service Paie de',
      fields: ['bankName', 'iban'],
      bodyText: 'Madame, Monsieur,\n\nJe vous informe par la présente d\'un changement concernant mes coordonnées bancaires.\n\nÀ compter de ce jour, je vous prie de bien vouloir virer mon salaire sur le compte ouvert auprès de la banque {{bankName}}, dont le numéro IBAN est le suivant : {{iban}}.\n\nJe vous remercie par avance de faire le nécessaire pour la prochaine paie et reste à votre disposition si besoin.'
    },
    {
      id: 'vacaciones',
      name: 'Congés payés',
      title: 'Demande de congés payés',
      recipient: 'À l\'attention de mon Responsable chez',
      fields: ['startDate', 'endDate'],
      bodyText: 'Madame, Monsieur,\n\nPar la présente, je vous prie de bien vouloir m\'accorder des jours de congés payés.\n\nJe souhaiterais m\'absenter du {{startDate}} au {{endDate}} inclus.\n\nJ\'ai veillé à ce que mon absence ne perturbe pas la bonne marche du service et j\'organiserai la transmission des informations nécessaires avant mon départ.\n\nDans l\'attente de votre validation, je vous prie d\'agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.'
    },
    {
      id: 'teletrabajo',
      name: 'Télétravail',
      title: 'Demande de télétravail',
      recipient: 'À l\'attention de la Direction / Ressources Humaines de',
      fields: ['startDate'],
      bodyText: 'Madame, Monsieur,\n\nPar la présente, je vous soumets une demande formelle pour bénéficier du dispositif de télétravail.\n\nJe souhaiterais mettre en place cette organisation à compter du {{startDate}}. Nous pourrons définir ensemble les jours de présence sur site et de télétravail afin de garantir la continuité de mes missions.\n\nJe reste à votre disposition pour échanger sur les modalités pratiques de cette mise en place.\n\nJe vous prie d\'agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.'
    },
    {
      id: 'cambio_domicilio',
      name: 'Changement d\'adresse',
      title: 'Notification de changement de domicile',
      recipient: 'À l\'attention du Département des Ressources Humaines de',
      fields: ['newAddress'],
      bodyText: 'Madame, Monsieur,\n\nJe vous informe par la présente de mon changement de domicile.\n\nJe vous prie de bien vouloir mettre à jour mon dossier administratif. Ma nouvelle adresse postale est désormais : {{newAddress}}.\n\nJe vous fournirai un justificatif de domicile sur simple demande.\n\nJe vous remercie par avance pour votre diligence.'
    },
    {
      id: 'anticipo_nomina',
      name: 'Acompte sur salaire',
      title: 'Demande d\'acompte sur salaire',
      recipient: 'À l\'attention du Service Paie de',
      fields: ['amount', 'reason'],
      bodyText: 'Madame, Monsieur,\n\nPar la présente, je sollicite votre bienveillance afin de m\'accorder un acompte sur mon salaire du mois en cours.\n\nLe montant souhaité est de {{amount}}, justifié par {{reason}}.\n\nCet acompte pourra être déduit de ma prochaine fiche de paie. Je vous remercie par avance pour votre compréhension et votre aide.\n\nJe vous prie d\'agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.'
    },
    {
      id: 'permiso_matrimonio',
      name: 'Congé pour mariage',
      title: 'Demande de congé pour mariage',
      recipient: 'À l\'attention du Département des Ressources Humaines de',
      fields: ['marriageDate', 'startDate', 'endDate'],
      bodyText: 'Madame, Monsieur,\n\nJe vous informe par la présente de mon futur mariage qui sera célébré le {{marriageDate}}.\n\nConformément aux dispositions légales et conventionnelles, je souhaite bénéficier de mes jours de congés pour événements familiaux du {{startDate}} au {{endDate}} inclus.\n\nJe vous remettrai un acte de mariage dès mon retour pour compléter mon dossier.\n\nJe vous remercie par avance et vous prie d\'agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.'
    }
  ],
  'zh': [
    {
      id: 'baja_voluntaria',
      name: '辞职申请',
      title: '正式辞职通知',
      recipient: '致 人力资源部 -',
      fields: ['lastDay'],
      bodyText: '尊敬的领导/人力资源部：\n\n您好！我写此信是为了正式通知您，我决定辞去目前在公司担任的职务。\n\n根据劳动法及公司规定，我的最后工作日将是 {{lastDay}}。\n\n在离职前，我将全力配合完成工作交接，归还公司资产。请您协助安排我的最终工资结算及离职证明的开具。\n\n感谢公司在此期间给予我的信任、支持和发展机会。祝愿公司未来蒸蒸日上。\n\n此致\n敬礼'
    },
    {
      id: 'excedencia',
      name: '停薪留职',
      title: '停薪留职/无薪休假申请',
      recipient: '致 公司管理层 -',
      fields: ['startDate', 'endDate'],
      bodyText: '尊敬的领导：\n\n您好！因个人原因，我特此向公司正式申请无薪休假/停薪留职。\n\n我申请的休假时间为 {{startDate}} 至 {{endDate}}（包含首尾两日）。\n\n我会在休假前妥善安排和交接我的各项工作，以确保团队的正常运作。\n\n恳请领导予以批准，感谢您的理解与支持。\n\n此致\n敬礼'
    },
    {
      id: 'reduccion_jornada',
      name: '缩短工时',
      title: '缩短工作时间申请',
      recipient: '致 人力资源部 -',
      fields: ['startDate', 'newSchedule'],
      bodyText: '尊敬的领导：\n\n您好！为了更好地平衡工作与家庭需要，我特此申请缩短工作时间。\n\n我希望从 {{startDate}} 起，将工作时间调整为：{{newSchedule}}。\n\n我承诺在调整后的工作时间内高效完成核心职责，并将竭尽全力确保工作质量不受影响。\n\n期待与您进一步商榷此安排，感谢您的体谅与批准。\n\n此致\n敬礼'
    },
    {
      id: 'cambio_cuenta',
      name: '更改工资卡',
      title: '更改工资代发银行账户',
      recipient: '致 财务部 -',
      fields: ['bankName', 'iban'],
      bodyText: '尊敬的财务部/人力资源部：\n\n您好！我写此信是为了通知您更改我的工资代发银行账户信息。\n\n即日起，请将我的工资及相关款项汇入以下新账户：开户行 {{bankName}}，账号/IBAN {{iban}}。\n\n如有需要提供进一步的证明文件，请随时告知。\n\n感谢您的协助与配合。\n\n此致\n敬礼'
    },
    {
      id: 'vacaciones',
      name: '年假申请',
      title: '年假申请书',
      recipient: '致 我的直属主管 -',
      fields: ['startDate', 'endDate'],
      bodyText: '尊敬的领导：\n\n您好！我特此向您正式申请年休假。\n\n我计划从 {{startDate}} 起休假，至 {{endDate}} 结束。休假结束后我将准时返岗。\n\n我已与团队成员协调好我休假期间的紧急事务对接，确保工作不受影响。\n\n恳请领导予以批准，感谢！\n\n此致\n敬礼'
    },
    {
      id: 'teletrabajo',
      name: '远程办公',
      title: '远程办公/居家办公申请',
      recipient: '致 管理层/人力资源部 -',
      fields: ['startDate'],
      bodyText: '尊敬的领导：\n\n您好！我特此申请实行远程办公/居家办公。\n\n我希望从 {{startDate}} 起开始这一工作模式。我相信在远程办公期间，我依然能够保持高效的产出与顺畅的沟通。\n\n我愿意与公司探讨具体的沟通机制与核心在线时间，以确保团队协作无碍。\n\n感谢您百忙之中审批我的申请。\n\n此致\n敬礼'
    },
    {
      id: 'cambio_domicilio',
      name: '住址变更',
      title: '住址变更通知',
      recipient: '致 人力资源部 -',
      fields: ['newAddress'],
      bodyText: '尊敬的人力资源部：\n\n您好！我写此信是为了通知您我的家庭住址已发生变更。\n\n请将我的员工档案及税务通讯地址更新为：{{newAddress}}。\n\n若需要提供居住证明等相关文件，烦请告知。感谢您的及时处理。\n\n此致\n敬礼'
    },
    {
      id: 'anticipo_nomina',
      name: '预支薪水',
      title: '预支薪水申请',
      recipient: '致 财务部 -',
      fields: ['amount', 'reason'],
      bodyText: '尊敬的领导/财务部：\n\n您好！根据公司规定，我特此申请预支本月的部分薪水。\n\n因 {{reason}}，我希望能预支金额 {{amount}}。\n\n我同意公司在接下来的常规发薪日中扣除该笔预支款项。对于给公司带来的不便，我深表歉意，并由衷感谢您的理解与帮助。\n\n此致\n敬礼'
    },
    {
      id: 'permiso_matrimonio',
      name: '婚假申请',
      title: '婚假申请',
      recipient: '致 人力资源部 -',
      fields: ['marriageDate', 'startDate', 'endDate'],
      bodyText: '尊敬的领导/人力资源部：\n\n您好！我非常高兴地通知您，我将于 {{marriageDate}} 举行婚礼。\n\n根据国家劳动法及公司相关规定，我特此申请婚假，休假时间为 {{startDate}} 至 {{endDate}}。\n\n休假结束后，我将向公司提交结婚证复印件以供存档。我会在休假前妥善安排好各项工作交接。\n\n感谢领导的批准与祝福！\n\n此致\n敬礼'
    }
  ]
};

export const getFieldConfig = (lang: string): Record<string, any> => {
  const t = uiTranslations[lang]?.fields || uiTranslations['es'].fields;
  return {
    lastDay: { label: t.lastDay, type: 'date', icon: Calendar, placeholder: '' },
    startDate: { label: t.startDate, type: 'date', icon: Calendar, placeholder: '' },
    endDate: { label: t.endDate, type: 'date', icon: Calendar, placeholder: '' },
    newSchedule: { label: t.newSchedule, type: 'text', icon: Calendar, placeholder: t.newSchedulePlaceholder },
    bankName: { label: t.bankName, type: 'text', icon: Briefcase, placeholder: t.bankNamePlaceholder },
    iban: { label: t.iban, type: 'text', icon: FileText, placeholder: t.ibanPlaceholder },
    amount: { label: t.amount, type: 'text', icon: FileText, placeholder: t.amountPlaceholder },
    reason: { label: t.reason, type: 'text', icon: Edit3, placeholder: t.reasonPlaceholder },
    newAddress: { label: t.newAddress, type: 'text', icon: MapPin, placeholder: t.newAddressPlaceholder },
    marriageDate: { label: t.marriageDate, type: 'date', icon: Calendar, placeholder: '' },
  };
};
