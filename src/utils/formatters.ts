export const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};

export const formatRate = (value: number) => {
    return value.toFixed(2).replace('.', ',');
};

export const parseCurrency = (value: string): number => {
    const digits = value.replace(/\D/g, '');
    return parseInt(digits || '0', 10) / 100;
};

export const parseRate = (value: string): number => {
    const digits = value.replace(/\D/g, '').slice(0, 5);
    return parseInt(digits || '0', 10) / 100;
};
