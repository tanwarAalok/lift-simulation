
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
    return notMovingLifts[0].liftElement;
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

    let liftElement = chooseLift(liftRequestQueue[0].getAttribute('floor'));
    if(liftElement === null){
        console.log("No free lifts");
        return setTimeout(() => {
            console.log("Calling again");
            processQueueRequest();
        }, 5000);
    }

    let nextFloorElement = liftRequestQueue.shift();
    const nextFloor = nextFloorElement.getAttribute('floor');

    updateLiftData(liftElement, true, nextFloor);

    moveLift(nextFloor, liftElement);

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
    }, 2500); // Time to wait before starting animation sequence
}

function toggleLiftDoor(liftElement){
    let doors = liftElement.children;
    for(let i = 0; i < doors.length; i++){
        doors[i].classList.toggle("open");
    }
}
function moveLift(nextFloor, liftElement){
    if(nextFloor > maxFloor || nextFloor < 0) return;
    const liftHeight = liftElement.firstElementChild.offsetHeight;
    liftElement.style.transform = `translateY(-${nextFloor * (liftHeight + 2)}px)`
}

