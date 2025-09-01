export const RegexEnum = {
    NICKNAME: /^[a-zA-Z0-9\s-]{2,30}$/,
    REAL_NAME: /^[a-zA-Z\s-]{2,50}$/,
    DESCRIPTION: /^[\s\S]{10,1000}$/,
    CATCH_PHRASE: /^[\s\S]{5,200}$/,
    SUPERPOWER: /^[a-zA-Z0-9\s,-]{2,100}$/,
};
