import * as dotenv from 'dotenv';
dotenv.config();

// Environment name
export type EnvironmentName = 'dev' | 'stg' | 'prod';
export type Locale = 'sg' | 'jp';

interface Credentials {
    username: string;
    password: string;
    gg_username: string;
    gg_password: string;
}

interface EnvironmentConfig {
    baseURL: string;
    credentials: Credentials;
    basicAuthUser?: string;
    basicAuthPass?: string;
}

// Environment list
const environments: Record<EnvironmentName, Record<Locale, EnvironmentConfig>> = {
    dev: {
        sg: {
            baseURL: 'https://sssg.dev.samsonite-asia.com/',
            credentials: {
                username: process.env.DEV_USERNAME as string,
                password: process.env.DEV_PASSWORD as string,
                gg_username: process.env.DEV_GG_USERNAME as string,
                gg_password: process.env.DEV_GG_PASSWORD as string
            },
            basicAuthUser: process.env.DEV_BASIC_AUTH_USER,
            basicAuthPass: process.env.DEV_BASIC_AUTH_PASS,
        },
        jp: {
            baseURL: 'https://ssjp.dev.samsonite-asia.com/',
            credentials: {
                username: process.env.DEV_USERNAME as string,
                password: process.env.DEV_PASSWORD as string,
                gg_username: process.env.DEV_GG_USERNAME as string,
                gg_password: process.env.DEV_GG_PASSWORD as string
            },
            basicAuthUser: process.env.DEV_BASIC_AUTH_USER,
            basicAuthPass: process.env.DEV_BASIC_AUTH_PASS,
        }

    },
    stg: {
        sg: {
            baseURL: 'https://sssg.stg.samsonite-asia.com/',
            credentials: {
                username: process.env.STG_USERNAME_SG as string,
                password: process.env.STG_PASSWORD_SG as string,
                gg_username: process.env.STG_GG_USERNAME as string,
                gg_password: process.env.STG_GG_PASSWORD as string
            },
            basicAuthUser: process.env.STG_BASIC_AUTH_USER,
            basicAuthPass: process.env.STG_BASIC_AUTH_PASS,
        },
        jp: {
            baseURL: 'https://ssjp.stg.samsonite-asia.com/',
            credentials: {
                username: process.env.STG_USERNAME_JP as string,
                password: process.env.STG_PASSWORD_JP as string,
                gg_username: process.env.STG_GG_USERNAME_JP as string,
                gg_password: process.env.STG_GG_PASSWORD_JP as string
            },
            basicAuthUser: process.env.STG_BASIC_AUTH_USER,
            basicAuthPass: process.env.STG_BASIC_AUTH_PASS,
        }
    },
    prod: {
        sg: {
            baseURL: 'https://www.samsonite.com.sg/',
            credentials: {
                username: process.env.PROD_USERNAME as string,
                password: process.env.PROD_PASSWORD as string,
                gg_username: process.env.PROD_GG_USERNAME as string,
                gg_password: process.env.PROD_GG_PASSWORD as string
            },
        },
        jp: {
            baseURL: 'https://www.samsonite.co.jp/',
            credentials: {
                username: process.env.PROD_USERNAME as string,
                password: process.env.PROD_PASSWORD as string,
                gg_username: process.env.PROD_GG_USERNAME as string,
                gg_password: process.env.PROD_GG_PASSWORD as string
            },
        }
    }
};

// Get ENV from terminal (defautl: stg, jp)
const currentEnv: EnvironmentName = (process.env.ENV as EnvironmentName) || 'stg';
const currentLocale = (process.env.LOCALE as Locale) || 'jp';

export const Config = environments[currentEnv][currentLocale];
export const CurrentEnv = currentEnv;
export const CurrentLocale = currentLocale;
