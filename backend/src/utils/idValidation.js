const RESOURCE_ID_PATTERN = /^[a-zA-Z0-9-]{8,}$/;

const isValidResourceId = (value) => {
    const normalized = String(value || '').trim();
    return RESOURCE_ID_PATTERN.test(normalized);
};

module.exports = { isValidResourceId };
