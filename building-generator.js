let liftInput = document.querySelector("#lifts");
let floorInput = document.querySelector("#floor");
let mainPage = document.querySelector(".main_page");
let startingForm = document.querySelector(".starting_form");
let building = document.querySelector(".building");

let maxFloor, isBuildingGenerated = false;

function goBack(){
    startingForm.classList.remove('hidden');
    mainPage.classList.add('hidden');
    building.innerHTML = '';
    // clearInterval(requestInterval)
}
function onFormSubmit(e){
    e.preventDefault();
    startingForm.classList.add('hidden');
    mainPage.classList.remove('hidden');
    maxFloor = floorInput.value;
    generateBuilding(Number(liftInput.value), Number(floorInput.value));
}

function generateBuilding(liftCount, floorCount){

    for(let floor = floorCount; floor >= 0; floor--){
        let floorElement = document.createElement('div');
        floorElement.classList.add('floor');
        floorElement.setAttribute('floor', floor);

        let btn_wrapper = document.createElement('div');
        btn_wrapper.classList.add('btn_wrap');

        let up_btn = document.createElement('button');
        let down_btn = document.createElement('button');
        up_btn.classList.add('floor_btn');
        down_btn.classList.add('floor_btn');
        up_btn.setAttribute('floor', floor);
        down_btn.setAttribute('floor', floor);
        up_btn.setAttribute('direction', 'up');
        down_btn.setAttribute('direction', 'down');
        up_btn.onclick = () => addRequestsToQueue(event);
        down_btn.onclick = () => addRequestsToQueue(event);

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
                liftElement.innerHTML = `
                    <div class="door left open"></div>
                    <div class="door right open"></div>
                `;
                liftElement.classList.add('lift');
                floorElement.appendChild(liftElement);
            }
        }

        floorElement.appendChild(floorLabel);
        building.appendChild(floorElement);
    }
    isBuildingGenerated = true;
}


