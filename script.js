function calculateBMI(name, weight, height, unit, age) {
    if (!name || !weight || !height || !unit || !age) {
        return { error: 'Please fill out all fields!' };
    }

    if (isNaN(weight) || isNaN(height) || isNaN(age)) {
        return { error: 'Please enter valid numerical values for weight, height, and age!' };
    }

    let heightInMeters;
    switch (unit) {
        case 'meters':
            heightInMeters = height;
            break;
        case 'centimeters':
            heightInMeters = height / 100;
            break;
        case 'inches':
            heightInMeters = height * 0.0254;
            break;
        default:
            return { error: 'Invalid height unit selected!' };
    }

    const calculatedBMI = (weight / (heightInMeters ** 2)).toFixed(2);

    let message;
    if (age < 18) {
        if (calculatedBMI < 18.5) {
            message = "Your BMI indicates you may be underweight. Focus on nutrient-dense foods like lean proteins (chicken, fish, beans), whole grains, fruits, and vegetables to gain healthy weight.";
        } else if (calculatedBMI >= 18.5 && calculatedBMI <= 22.9) {
            message = "Your BMI falls within the healthy range for your age. Maintain this by consuming a balanced diet rich in fruits, vegetables, whole grains, and lean protein sources.";
        } else if (calculatedBMI >= 23 && calculatedBMI <= 27.9) {
            message = "Your BMI suggests you may be slightly overweight. Prioritize whole foods, limit processed foods, and increase physical activity to achieve and maintain a healthy weight.";
        } else {
            message = "Your BMI indicates you may be overweight. Consider a balanced diet with an emphasis on fruits, vegetables, lean protein, and whole grains, combined with regular exercise.";
        }
    } else if (age >= 18 && age <= 65) {
        if (calculatedBMI < 18.5) {
            message = "Your BMI suggests you may be underweight. Focus on increasing calorie intake with nutrient-dense foods like nuts, seeds, avocados, and healthy oils.";
        } else if (calculatedBMI >= 18.5 && calculatedBMI <= 24.9) {
            message = "Congratulations! Your BMI falls within the healthy range. Maintain this by consuming a balanced diet with plenty of fruits, vegetables, whole grains, and lean protein sources.";
        } else if (calculatedBMI >= 25 && calculatedBMI <= 29.9) {
            message = "Your BMI suggests you may be overweight. Prioritize whole foods, limit processed foods and sugary drinks, and increase physical activity.";
        } else {
            message = "Your BMI indicates you may be obese. Consider consulting a registered dietitian for personalized dietary guidance and a sustainable weight management plan.";
        }
    } else {
        if (calculatedBMI < 23) {
            message = "While your BMI is within the healthy range, maintaining muscle mass is crucial as we age. Include protein sources like fish, poultry, beans, and legumes in your diet.";
        } else if (calculatedBMI >= 23 && calculatedBMI <= 29.9) {
            message = "Your BMI suggests you may be overweight. Focus on a balanced diet rich in fruits, vegetables, whole grains, and lean protein sources, while limiting processed foods and sugary drinks.";
        } else {
            message = "Your BMI indicates you may be obese. Consider consulting a registered dietitian for personalized dietary guidance and a sustainable weight management plan.";
        }
    }

    return {
        bmi: calculatedBMI,
        message: `${name}, your BMI is ${calculatedBMI}. ${message}`
    };
}

function handleSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const unit = document.getElementById('heightUnit').value;
    const age = parseInt(document.getElementById('age').value);

    const result = calculateBMI(name, weight, height, unit, age);

    if (result.error) {
        alert(result.error);
    } else {
        document.getElementById('result').innerHTML = `<h3>${result.message}</h3>`;
    }
}

function reload() {
    document.getElementById('name').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('height').value = '';
    document.getElementById('age').value = '';
    document.getElementById('heightUnit').value = 'meters';
    document.getElementById('result').innerHTML = '';
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('bmiForm').addEventListener('submit', handleSubmit);
    document.getElementById('reload').addEventListener('click', reload);
});
