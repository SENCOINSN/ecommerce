import { z } from 'zod';

export const SignupSchema = z.object({
    name: z.string().min(3).max(100),
    email: z.string().email(),
    password: z.string().min(8).max(20)
})

export const AddressSchema = z.object({
    lineOne: z.string(),
    city: z.string(),
    country: z.string().min(3).max(25),
    pincode: z.string().length(6)
});

export const updateUserSchema = z.object({ 
    name: z.string().optional(),
    defaultShippingAddress: z.number().optional(),
    defaultBillingAddress: z.number().optional()
})