export function officeInfo(state) {
    return state.officeLocationData
}

export function staffInfo(state) {
    return state.staffData
}

export function inViewOfficeId(state) {
    return state.inViewOfficeId
}

export function inViewOfficeInfo(state) {
    let obj = state.officeLocationData[state.inViewOfficeId]
    let address = `${obj.address}, ${obj.town}, ${obj.city}, ${obj.state === null ? '' : `${obj.state}, `}${obj.country}`
    let inViewOfficeInfo = {
        title: obj.name,
        data: [{
            label: 'Address',
            data: address
        }, {
            label: 'Telephone',
            data: obj.telephone
        }, {
            label: 'Fax',
            data: obj.fax
        }, {
            label: 'Website',
            data: obj.website
        }, {
            label: 'Email',
            data: []
        }]
    }
    state.staffData.forEach((staff) => {
        if (staff.country === obj.country) {
            inViewOfficeInfo.data[4].data.push({
                label: staff.name,
                data: staff.email
            })
        }
    })
    return inViewOfficeInfo
}
