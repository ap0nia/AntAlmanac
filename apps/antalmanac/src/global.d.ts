declare module 'notistack' {
    type OriginalOptionsObject = import('notistack').OptionsObject;

    interface OptionsObject extends OriginalOptionsObject {
        duration: number;
        position: unknown;
    }
}

export {};
