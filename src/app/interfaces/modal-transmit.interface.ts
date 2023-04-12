export interface ModalTransmit {
  actions_strings: Transmit,
  transmitContinue: (response: string) => {};
  transmitCancel: (response: string) => {};
}

interface Button{
    text: string;
    reply: string;
}

interface Transmit{
    template_id: string;
    icon: string;
    text_title: string;
    text_instruction: string; 
    button_A: Button;
    button_close?: Button;
    button_B?:Button;
}

export interface ModalTransmitInfo{
   title: string;
   text: string;
   continueText: string;
   actionContext: object;
   submitBlock: (response: any) => {};
   clientContext: object;
   showClose: boolean;
}