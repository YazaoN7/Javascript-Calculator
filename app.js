// get html container
const container = document.getElementById("btn-container")




// insert button implemtation using DOM manipulation later
operatorArray = ["+", "-", "/", "*"];

const handleClick = (e) => {
    operate();
}


operatorArray.forEach(element => {
    const operator = document.createElement("button")
    operator.innerHTML = element;
    operator.addEventListener("click", handleClick);
    container.appendChild(operator)
});

// addition function

function addition(...args)
{
    return args.reduce(function (acc, curr)
    {
        return acc + curr;
    })
}

// subtraction function

function subtraction(...args)
{
    return args.reduce(function (acc, curr)
    {
        return acc - curr;
    })
}

// division function

function division(...args)
{
    return args.reduce(function (acc, curr)
    {
        return acc / curr;
    })
}

// multiplication function

function multiplication(...args)
{
    return args.reduce(function (acc, curr)
    {
        return acc * curr;
    })
}

// take an operator and 2 nums then call the appropriate function

function operate(operator, num1, num2)
{
    // detect what operator was used
    if (operator == "+")
    {
        // call addition function
        return
    }
    else if (operator == "-")
    {
        // call subtract function
    }
    else if (operator == "/")
    {
        // call division function
    }
    else if (operator == "*")
    {
        // call multiplication function
    }
    // call one of the functions and perform arithmetic following PEMDAS
}