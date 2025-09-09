import * as dotenv from 'dotenv';
dotenv.config();

// Environment name
export type EnvironmentName = 'dev' | 'stg' | 'prod';
export type Locale = 'en' | 'ja';

interface Credentials {
    username: string;
    password: string;
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
        en: {
            baseURL: 'https://sssg.dev.samsonite-asia.com/',
            credentials: {
                username: process.env.DEV_USERNAME as string,
                password: process.env.DEV_PASSWORD as string,
            },
            basicAuthUser: process.env.DEV_BASIC_AUTH_USER,
            basicAuthPass: process.env.DEV_BASIC_AUTH_PASS,
        },
        ja: {
            baseURL: 'https://ssjp.dev.samsonite-asia.com/',
            credentials: {
                username: process.env.DEV_USERNAME as string,
                password: process.env.DEV_PASSWORD as string,
            },
            basicAuthUser: process.env.DEV_BASIC_AUTH_USER,
            basicAuthPass: process.env.DEV_BASIC_AUTH_PASS,
        }

    },
    stg: {
        en: {
            baseURL: 'https://sssg.stg.samsonite-asia.com/',
            credentials: {
                username: process.env.STG_USERNAME as string,
                password: process.env.STG_PASSWORD as string,
            },
            basicAuthUser: process.env.STG_BASIC_AUTH_USER,
            basicAuthPass: process.env.STG_BASIC_AUTH_PASS,
        },
        ja: {
            baseURL: 'https://ssjp.stg.samsonite-asia.com/',
            credentials: {
                username: process.env.STG_USERNAME as string,
                password: process.env.STG_PASSWORD as string,
            },
            basicAuthUser: process.env.STG_BASIC_AUTH_USER,
            basicAuthPass: process.env.STG_BASIC_AUTH_PASS,
        }
    },
    prod: {
        en: {
            baseURL: 'https://www.samsonite.com.sg/',
            credentials: {
                username: process.env.PROD_USERNAME as string,
                password: process.env.PROD_PASSWORD as string,
            },
        },
        ja: {
            baseURL: 'https://www.samsonite.co.jp/',
            credentials: {
                username: process.env.PROD_USERNAME as string,
                password: process.env.PROD_PASSWORD as string,
            },
        }
    }
};

// Get ENV from terminal (defautl: dev, en)
const currentEnv: EnvironmentName = (process.env.ENV as EnvironmentName) || 'dev';
const currentLocale = (process.env.LOCALE as Locale) || 'en';

export const Config = environments[currentEnv][currentLocale];
export const CurrentEnv = currentEnv;
export const CurrentLocale = currentLocale;
