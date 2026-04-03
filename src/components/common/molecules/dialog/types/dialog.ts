export interface DialogOptions {
    title?: string;
    description: string;
  }
  
  export interface DialogContextValue {
    openDialog: (options: DialogOptions) => void;
  }
  