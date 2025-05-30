import { z } from 'zod';

export const CreateConsumerRequestId = 'bac379d4-a5be-4de7-835a-9ac8c1b6c48d';
export const CreateConsumerRequestSchema = z.object({
    code: z.string(),
});
export type CreateConsumerRequest = z.infer<typeof CreateConsumerRequestSchema>;
export const CreateConsumerResponseSchema = z.union([
    z.object({
        type: z.literal('error'),
        error: z.enum(['trmnlError', 'databaseInsertError']),
    }),
    z.object({
        type: z.literal('success'),
    }),
]);
export type CreateConsumerResponse = z.infer<
    typeof CreateConsumerResponseSchema
>;

export const FetchConsumerDataRequestId =
    '776eee94-2de5-44cb-bbed-1e1f65a68d73';
export const FetchConsumerDataRequestSchema = z.object({
    trmnlId: z.string().uuid(),
    authToken: z.string(),
});
export type FetchConsumerDataRequest = z.infer<
    typeof FetchConsumerDataRequestSchema
>;
export const FetchConsumerDataResponseSchema = z.union([
    z.object({
        type: z.literal('error'),
        error: z.enum([
            'authenticationError',
            'authorizationError',
            'consumerNotFoundError',
            'databaseQueryError',
        ]),
    }),
    z.object({
        type: z.literal('success'),
        data: z.object({
            name: z.string(),
            trmnlId: z.string().uuid(),
            settingsId: z.number(),
        }),
    }),
]);
export type FetchConsumerDataResponse = z.infer<
    typeof FetchConsumerDataResponseSchema
>;

export const UpdateCanvasDataRequestId = 'e6d25226-fc23-45b9-bbd7-4e74f44285e6';
export const UpdateCanvasDataRequestSchema = z.object({
    trmnlId: z.string().uuid(),
    authToken: z.string(),
    canvasServer: z.string().url(),
    canvasAccessToken: z.string(),
});
export type UpdateCanvasDataRequest = z.infer<
    typeof UpdateCanvasDataRequestSchema
>;
export const UpdateCanvasDataResponseSchema = z.union([
    z.object({
        type: z.literal('error'),
        error: z.enum([
            'authenticationError',
            'authorizationError',
            'invalidUrlError',
            'consumerNotFoundError',
            'databaseQueryError',
            'databaseInsertError',
        ]),
    }),
    z.object({
        type: z.literal('success'),
    }),
]);
export type UpdateCanvasDataResponse = z.infer<
    typeof UpdateCanvasDataResponseSchema
>;

export const GlobalRequestSchema = z.object({
    procedure: z.enum([
        CreateConsumerRequestId,
        FetchConsumerDataRequestId,
        UpdateCanvasDataRequestId,
    ]),
    data: z.any().optional(),
});
export type GlobalRequest = z.infer<typeof GlobalRequestSchema>;

export const GlobalErrorResponseSchema = z.object({
    type: z.literal('globalError'),
    error: z.enum([
        'jsonParseError',
        'globalSchemaValidationError',
        'procedureSchemaValidationError',
    ]),
    message: z.string().optional(),
});
export type GlobalErrorResponse = z.infer<typeof GlobalErrorResponseSchema>;
