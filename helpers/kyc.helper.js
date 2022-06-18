const isPatientKycVerified = (user) => {
    if (user.kycStatus === 'verified') {
        return true;
    }
    return false;
}

const isDoctorKycVerified = (doctor) => {
    if (doctor.kycStatus === 'verified') {
        return true;
    }
    return false;
}

module.exports = {
    isPatientKycVerified,
    isDoctorKycVerified
}