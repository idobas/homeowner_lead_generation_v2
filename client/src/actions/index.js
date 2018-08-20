export const SAVE_USER_DETAILS = 'SAVE_USER_DETAILS';
export const CHANGE_PROGRESS_BAR_PROGRESS = 'CHANGE_PROGRESS_BAR_PROGRESS';
export const ADDRESS_CHANGED = 'ADDRESS_CHANGED';
export const GET_ZESTIMATE = 'GET_ZESTIMATE';

export function saveUserdetails(details) {
    localStorage.setItem('username', details.firstName);
    return {
        type: SAVE_USER_DETAILS,
        payload: details
    }
}

export function changeProgressBarProgress(path) {
    let progress = 0;
    switch(path) {
        case '/':
            progress = 0;
            break;
        case '/address':
            progress = 50;
            break;
        case '/zestimate':
            progress = 100;
            break;
        default:
            break;
    }
    return {
        type: CHANGE_PROGRESS_BAR_PROGRESS,
        payload: {progress}
    }
}

export function addressChanged(address, isInMaps) {
    return {
        type: ADDRESS_CHANGED,
        payload: {address, isInMaps}
    }
}

export function getZestimate(address, firstName, lastName, email, phoneNumber) {
    const originalAddress = address;
    const addressDetails = address.split(', ');
    address = encodeURI(addressDetails[0]);
    const cityStateZip = encodeURI(addressDetails[1] + ' ' + addressDetails[2]);
    const API_KEY = 'X1-ZWz1gl9e707ll7_2t4xn';
    const url = `api/zestimate?API_KEY=${API_KEY}&address=${address}&cityStateZip=${cityStateZip}&firstName=${firstName}&lastName=${lastName}&email=${email}&phoneNumber=${phoneNumber}&originalAddress=${originalAddress}`;
    const request = fetch(url).then(result  => result.text());
    return {
        type: GET_ZESTIMATE,
        payload: request
    }
}