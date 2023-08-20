let liftInput = document.querySelector("#lifts");
let floorInput = document.querySelector("#floor");
let mainPage = document.querySelector(".main_page");
let startingForm = document.querySelector(".starting_form");
let building = document.querySelector(".building");
let liftsData = [];
let liftRequestQueue = [];
let maxFloor;

function goBack(){
    startingForm.classList.remove('hidden');
    mainPage.classList.add('hidden');
    building.innerHTML = '';
    liftsData = [];
    liftRequestQueue = [];
}
function onFormSubmit(e){
    e.preventDefault();
    startingForm.classList.add('hidden');
    mainPage.classList.remove('hidden');
    maxFloor = floorInput.value;
    generateBuilding(Number(liftInput.value), Number(floorInput.value));
    defaultLiftData();
}

function generateBuilding(liftCount, floorCount){

    for(let floor = floorCount; floor >= 0; floor--) {
        let floorElement = document.createElement('div');
        floorElement.classList.add('floor');
        floorElement.setAttribute('floor', floor);

        let btn_wrapper = document.createElement('div');
        btn_wrapper.classList.add('btn_wrap');

        let up_btn = document.createElement('button');
        let down_btn = document.createElement('button');

        up_btn.classList.add('floor_btn', 'up_btn');
        down_btn.classList.add('floor_btn', 'down_btn');
        up_btn.setAttribute('floor', floor);
        down_btn.setAttribute('floor', floor);
        up_btn.onclick = (event) => addRequestsToQueue(event);
        down_btn.onclick = (event) => addRequestsToQueue(event);


        if (floor !== floorCount) btn_wrapper.appendChild(up_btn);
        if (floor !== 0) btn_wrapper.appendChild(down_btn);

        let floorLabel = document.createElement('h5');
        floorLabel.classList.add('floorLabel');
        floorLabel.textContent = `Floor ${floor}`;

        floorElement.appendChild(btn_wrapper);

        if (floor === 0) {
            for (let lift = 1; lift <= liftCount; lift++) {
                let liftElement = document.createElement('div');
                liftElement.innerHTML = `
                    <div class="door left open"></div>
                    <div class="door right open"></div>
                `;
                liftElement.classList.add('lift');
                // liftElement.setAttribute('currentFloor', floor);
                // liftElement.setAttribute('isMoving', false);
                floorElement.appendChild(liftElement);
            }
        }

        floorElement.appendChild(floorLabel);
        building.appendChild(floorElement);
    }
}

function defaultLiftData(){
    let allLifts = document.querySelectorAll('.lift');
    for(let i = 0; i<allLifts.length; i++){
        liftsData.push({
            liftElement: allLifts[i],
            floor: 0,
            isMoving: false
        })
    }
}


