
function addRequestsToQueue(e){
    const newFloor = e.target.getAttribute('floor');

    //TODO: request for same floor is being processed in the beginning
    for(let req in liftRequestQueue){
        if(liftRequestQueue[req].getAttribute('floor') === newFloor) {
            console.log("already present")
            return;
        }
    }
    e.target.classList.toggle('btn_toggle');
    liftRequestQueue.push(e.target);
    processQueueRequest();
}

function chooseLift(nextFloor){
    let notMovingLifts = liftsData.filter((lift) => lift.isMoving === false);
    if(notMovingLifts.length === 0) return null;

    notMovingLifts.sort((a, b) => {
        return Math.abs(nextFloor-a.floor) - Math.abs(nextFloor - b.floor);
    })
    return notMovingLifts[0];
}

function updateLiftData(liftElement, isMoving, floor){
    for(let i = 0; i < liftsData.length; i++){
        if(liftsData[i].liftElement === liftElement){
            liftsData[i].isMoving = isMoving;
            liftsData[i].floor = floor;
        }
    }
}

function processQueueRequest() {
    if(liftRequestQueue.length === 0){
        console.log("No active requests");
        return;
    }

    let liftChoice = chooseLift(liftRequestQueue[0].getAttribute('floor'));
    if(liftChoice === null){
        console.log("No free lifts");
        return setTimeout(() => {
            console.log("Calling again");
            processQueueRequest();
        }, 5000);
    }

    let {liftElement, floor: currFloor, isMoving} = chooseLift(liftRequestQueue[0].getAttribute('floor'));

    let nextFloorElement = liftRequestQueue.shift();
    const nextFloor = Number(nextFloorElement.getAttribute('floor'));

    updateLiftData(liftElement, true, nextFloor);

    const floorDiff = Math.abs(nextFloor - currFloor)
    moveLift(floorDiff, nextFloor, liftElement);

    setTimeout(() => {
        nextFloorElement.classList.toggle('btn_toggle');
        toggleLiftDoor(liftElement);
        setTimeout(() => {
            toggleLiftDoor(liftElement);
            setTimeout(() => {
                updateLiftData(liftElement, false, nextFloor);
                processQueueRequest(); // Move to the next request after animations
            }, 2500); // Door closing animation time
        }, 2500); // Door opening animation time
    }, 2000*floorDiff); // Time to wait before starting animation sequence
}

function toggleLiftDoor(liftElement){
    let doors = liftElement.children;
    for(let i = 0; i < doors.length; i++){
        doors[i].classList.toggle("open");
    }
}
function moveLift(floorDiff, nextFloor, liftElement){
    if(nextFloor > maxFloor || nextFloor < 0) return;
    const liftHeight = liftElement.firstElementChild.offsetHeight;
    liftElement.style.transform = `translateY(-${nextFloor * (liftHeight + 2)}px)`
    liftElement.style.transition = `transform ${2 * floorDiff}s ease`;
}

