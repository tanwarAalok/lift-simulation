let liftInput = document.querySelector("#lifts");
let floorInput = document.querySelector("#floor");
let mainPage = document.querySelector(".main_page");
let startingForm = document.querySelector(".starting_form");
let building = document.querySelector(".building");


function goBack(){
    startingForm.classList.remove('hidden');
    mainPage.classList.add('hidden');
    building.innerHTML = '';
}
function onFormSubmit(e){
    e.preventDefault();
    startingForm.classList.add('hidden');
    mainPage.classList.remove('hidden');
    generateBuilding(Number(liftInput.value), Number(floorInput.value));
}

function generateBuilding(liftCount, floorCount){

    for(let floor = floorCount; floor >= 0; floor--){
        let floorElement = document.createElement('div');
        floorElement.classList.add('floor');

        let btn_wrapper = document.createElement('div');
        btn_wrapper.classList.add('btn_wrap');

        let up_btn = document.createElement('button');
        let down_btn = document.createElement('button');

        up_btn.textContent = 'Up';
        down_btn.textContent = 'Down';

        if(floor !== floorCount) btn_wrapper.appendChild(up_btn);
        if(floor !== 0) btn_wrapper.appendChild(down_btn);

        let floorLabel = document.createElement('h5');
        floorLabel.classList.add('floorLabel');
        if(floor !== 0) floorLabel.textContent = `Floor ${floor}`;
        else floorLabel.textContent = 'Ground Floor';

        floorElement.appendChild(btn_wrapper);

        if(floor === 0){
            for(let lift = 1; lift <= liftCount; lift++){
                let liftElement = document.createElement('div');
                liftElement.classList.add('lift');
                floorElement.appendChild(liftElement);
            }
        }

        floorElement.appendChild(floorLabel);
        building.appendChild(floorElement);
    }

}
