exports.getMedsList = medList => {

    if (medList !== "") {
        var meds = medList.reduce((accumulator, currentValue) => {
            if (currentValue.groupBY === 1) {
                if (accumulator[0] == null) {
                    accumulator[0] = [];
                    accumulator[0].push(currentValue.value);
                }
                else
                    accumulator[0].push(currentValue.value)
            }
            else if (currentValue.groupBY === 2) {
                if (accumulator[1] == null) {
                    accumulator[1] = [];
                    accumulator[1].push(currentValue.value);
                }
                else
                    accumulator[1].push(currentValue.value)
            }
            else if (currentValue.groupBY === 3) {
                if (accumulator[2] == null) {
                    accumulator[2] = [];
                    accumulator[2].push(currentValue.value)
                }
                else
                    accumulator[2].push(currentValue.value)
            }
            else {
                if (accumulator[3] == null) {
                    accumulator[3] = [];
                    accumulator[3].push(currentValue.value)
                }
                else
                    accumulator[3].push(currentValue.value)
            }
            return accumulator;



        }, [null, null, null, null])
    }
    return meds;
}

exports.getInsulinList = insulinList => {
    if (insulinList !== "") {
        var selectedInsulinTypes = insulinList.reduce((accumulator, currentValue) => {

            if (currentValue.groupBY === 1) {
                accumulator[0] = 1;
            }
            else if (currentValue.groupBY === 2) {
                accumulator[1] = 2;
            }
            else if (currentValue.groupBY === 3) {
                accumulator[2] = 3;
            }
            else if (currentValue.groupBY === 4) {
                accumulator[3] = 4;
            }
            return accumulator;

        }, [])
    }
    return selectedInsulinTypes;

}

exports.selectInsulins = (insulinsData, configInsulin) => {
    var selectedInsulins = [];
    for (var i = 0; i < configInsulin.length; i++) {
        var type = configInsulin[i].insulinType;
        var pos = type - 1;
        for (var j = 0; j < configInsulin[i].medsList.length; j++) {
            var medid = configInsulin[i].medsList[j];
            for (let k = 0; k < insulinsData[pos].medsList.length; k++) {
                if (medid === insulinsData[pos].medsList[k].id) {
                    var medDetails = {};
                    medDetails.groupBY = configInsulin[i].insulinType
                    medDetails.value = medid;
                    medDetails.label = insulinsData[pos].medsList[k].name;                                        //medslist change
                    selectedInsulins.push(medDetails);
                }
            }
        }
    }
    return selectedInsulins;
}

exports.getSelectedBGMeterTypes = (MeterOptions, selectedBGMeters) => {
    if (selectedBGMeters != undefined) {
        let selectedBGMetersWithLabel = [];
        for (let i = 0; i < selectedBGMeters.length; i++) {
            let item = selectedBGMeters[i];
            let BgObj = {};

            BgObj.value = MeterOptions[item - 1].value;
            BgObj.label = MeterOptions[item - 1].label;
            selectedBGMetersWithLabel.push(BgObj);

        }
        return selectedBGMetersWithLabel;
    }
}

exports.getSelectedCountry = (selectedCountry) => {
    let selectedCountryObj = {};


    selectedCountryObj.value = selectedCountry.id;
    selectedCountryObj.label = selectedCountry.name

    return selectedCountryObj;
}

exports.getSelectedGlucoseUOM = (observationTypes, selectedObsTypes) => {
    var GlucoseOptions = [];
    observationTypes.map(obj => {
        for (let i = 0; i < selectedObsTypes.length; i++) {
            if (obj.name == 'Glucose' && selectedObsTypes[i].type === 3) {
                Object.keys(obj.units).map(units => {
                    for (let j = 0; j < selectedObsTypes[i].uom.length; j++) {
                        if (selectedObsTypes[i].uom[j] == obj.units[units]) {
                            let glucoseObj = {};
                            glucoseObj.type = selectedObsTypes[i].type;
                            glucoseObj.value = obj.units[units];
                            glucoseObj.label = units;
                            GlucoseOptions.push(glucoseObj);
                        }
                    }

                })
            }
        }
    })

    return GlucoseOptions;
}

exports.getPreferredCountries = (country) => {
    let countryOptions = country.map(obj => {
        return obj.name;
    })
    return countryOptions;
}

exports.getSelectedHeightUOM = (observationTypes, selectedObsTypes) => {
    var HeightOptions = [];
    observationTypes.map(obj => {
        for (let i = 0; i < selectedObsTypes.length; i++) {

            if (selectedObsTypes[i].type === 1 && obj.name == 'Height') {
                Object.keys(obj.units).map(units => {
                    for (let j = 0; j < selectedObsTypes[i].uom.length; j++) {
                        if (selectedObsTypes[i].uom[j] == obj.units[units]) {
                            let heightObj = {};
                            heightObj.type = selectedObsTypes[i].type;
                            heightObj.value = obj.units[units];
                            heightObj.label = units;
                            HeightOptions.push(heightObj);
                        }
                    }

                })
            }
        }
    })
    return HeightOptions;
}

exports.getSelectedWeightUOM = (observationTypes, selectedObsTypes) => {
    var WeightOptions = [];
    observationTypes.map(obj => {
        for (let i = 0; i < selectedObsTypes.length; i++) {
            if (obj.name == 'Weight' && selectedObsTypes[i].type === 2) {
                Object.keys(obj.units).map(units => {
                    for (let j = 0; j < selectedObsTypes[i].uom.length; j++) {
                        if (selectedObsTypes[i].uom[j] == obj.units[units]) {
                            let weightObj = {};
                            weightObj.type = 3;
                            weightObj.value = obj.units[units];
                            weightObj.label = units;
                            WeightOptions.push(weightObj);
                        }
                    }

                })
            }
        }
    })
    return WeightOptions;
}

exports.getInsulinData = (insulins) => {
    let insulinData = insulins;
    let insulinOpt = [];
    insulinData.map((obj, i) => {
        var insulinObj = {};
        insulinObj.options = [];
        insulinObj.label = obj.insulinName;
        obj.medsList.map((medObj) => {
            var medInfo = {};
            medInfo.label = medObj.name;
            medInfo.value = medObj.id;
            medInfo.groupBY = i + 1;
            insulinObj.options.push(medInfo)
        })
        insulinOpt.push(insulinObj);

    })
    return insulinOpt;
}

exports.getCountryData = (country) => {

    let countryOptions = [];
    country.map(obj => {
        let countryObj = {};
        countryObj.label = obj.name;
        countryObj.value = obj.id;
        countryOptions.push(countryObj);
    })
    return countryOptions;
}

exports.getHeightData = (observation) => {
    let heightOptions = [];
    observation.map(obj => {
        if (obj.name == 'Height') {
            Object.keys(obj.units).map(units => {
                let heightObj = {};
                heightObj.type = 1;
                heightObj.value = obj.units[units];
                heightObj.label = units;
                heightOptions.push(heightObj);
            })
        }
    })
    return heightOptions;
}

exports.getWeightData = (observation) => {
    let weightOptions = [];
    observation.map(obj => {
        if (obj.name == 'Weight') {
            Object.keys(obj.units).map(units => {
                let weightObj = {};
                weightObj.type = 2;
                weightObj.value = obj.units[units];
                weightObj.label = units;
                weightOptions.push(weightObj);
            })
        }
    })
    return weightOptions;
}

exports.getGlucoseData = (observation) => {
    let glucoseOptions = [];
    observation.map(obj => {
        if (obj.name == 'Glucose') {
            Object.keys(obj.units).map(units => {
                let glucoseObj = {};
                glucoseObj.type = 3;
                glucoseObj.value = obj.units[units];
                glucoseObj.label = units;
                glucoseOptions.push(glucoseObj);
            })
        }
    })
    return glucoseOptions;
}