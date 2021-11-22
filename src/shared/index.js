export const planOptions = {
    'T11A20' : 'Package 1 (benefit 200k)',
    'T11A50' : 'Package 2 (benefit 500k)',
    'T11AM1' : 'Package 3 (benefit 1M)',
};

export const getPlanName = (key) => {
    return planOptions[key] || '-';
}

export const paymentFrequencyOptions = {
    'YEARLY' : 'รายปี',
    'HALFYEARLY' : 'รายครึ่งปี',
    'QUARTERLY' : 'ราย 3 เดือน',
    'MONTHLY' : 'รายเดือน',
};

export const getPaymentFrequency= (key) => {
    return paymentFrequencyOptions[key] || '-';
}
