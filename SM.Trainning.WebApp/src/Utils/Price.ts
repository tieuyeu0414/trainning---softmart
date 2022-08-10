//format VNĐ
export function formatNumberVND(number: any) {
    if (number) {
        let numberFormat = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        }).format(number)
        return numberFormat
    }
    else{
        let numberFormat = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        }).format(0)
        return numberFormat
    }
}

//format USD
export function formatNumberUSD(number: any) {
    if (number) {
        let numberFormat = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        }).format(number)
        return numberFormat
    }
    else{
        let numberFormat = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        }).format(0)
        return numberFormat
    }
}

//format number
export function formatNumber(number: any) {
    if (number) {
        let numberFormat = number.toLocaleString('en-US')
        return numberFormat
    }
    else{
        let numberFormat = 0
        return numberFormat
    }
}