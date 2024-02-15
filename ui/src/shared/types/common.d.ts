declare type IconName = string;

declare type PhoneNumber = string;

declare type DateTimeString = string;

declare type EffectStatus = 'idle' | 'pending' | 'fulfilled' | 'rejected';

declare type RoutePath = string;

declare type EffectState = {
    status: EffectStatus;
    error?: string;
};

declare type BaseError = {
    data: {
        message: string | undefined;
        statusCode: number;
    };
    status: number;
};
