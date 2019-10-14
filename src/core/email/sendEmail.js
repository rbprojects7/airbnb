import React from 'react';
import Oy from 'oy-vey';
import { IntlProvider } from 'react-intl';
import fetch from '../fetch';
import EmailTemplate from './template/EmailTemplate';
import {emailConfig, bccEmaillist} from '../../config';
import {getSubject} from './template/subjects';

export async function sendEmail(to, type, content) {
        const from = `${emailConfig.sender}<${emailConfig.senderEmail}>`;
        let html, subject, previewText;
        let subjectData = getSubject(type);
        let bcc = bccEmaillist;
        if (type === 'reflection') {
            const reflectionSubjectData = subjectData;
            reflectionSubjectData.subject = `${content.hostName}, ${reflectionSubjectData.subject}`;
            subjectData = reflectionSubjectData;
        }
        if (type === 'inquiry') {
            const inquirySubjectData = subjectData;
            inquirySubjectData.subject = `${content.receiverName}, ${inquirySubjectData.subject}`;
            inquirySubjectData.previewText = `${content.senderName}, ${inquirySubjectData.previewText} ${content.listTitle} experience`;
            subjectData = inquirySubjectData;
        }
    html = Oy.renderTemplate(
        <IntlProvider locale={"en"}>
            <EmailTemplate type={type} content={content} />
        </IntlProvider>, {
            title: subjectData.subject,
            previewText: subjectData.previewText
        });

    const mailOptions = {
        from,
        to, // list of receivers
        bcc,
        subject: subjectData.subject, // Subject line
            //text: textMessage, // plain text body
        html
    };
    const resp = await fetch('/sendEmail', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({mailOptions}),
        credentials: 'include'
    });
    const { status, response } = await resp.json();
    return { status, response };
}
