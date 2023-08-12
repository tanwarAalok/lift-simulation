let liftRequestQueue = [];
let isMoving = false;

function addRequestsToQueue(e){
    const newFloor = e.target.getAttribute('floor');

    //TODO: same request of same floor is being processed in the beginning
    for(let req in liftRequestQueue){
        if(liftRequestQueue[req].getAttribute('floor') === newFloor) {
            console.log("already present")
            return;
        }
    }
    e.target.classList.toggle('btn_toggle');
    liftRequestQueue.push(e.target);
    if(!isMoving) processQueueRequest();
}


function processQueueRequest() {
    if (liftRequestQueue.length === 0) {
        isMoving = false;
        return;
    }

    isMoving = true;

    let nextFloorElement = liftRequestQueue.shift();
    const nextFloor = nextFloorElement.getAttribute('floor');

    moveLift(nextFloor);

    setTimeout(() => {
        nextFloorElement.classList.toggle('btn_toggle');
        toggleLiftDoor();
        setTimeout(() => {
            toggleLiftDoor();
            setTimeout(() => {
                processQueueRequest(); // Move to the next request after animations
            }, 2500); // Door closing animation time
        }, 2500); // Door opening animation time
    }, 2500); // Time to wait before starting animation sequence
}

function toggleLiftDoor(){
    const doors = document.querySelectorAll(".door");
    doors.forEach(door => {
        door.classList.toggle("open");
    });
}
function moveLift(nextFloor){
    if(nextFloor > maxFloor || nextFloor < 0) return;
    let liftElement = document.querySelector('.lift');
    const liftHeight = liftElement.firstElementChild.offsetHeight;
    liftElement.style.transform = `translateY(-${nextFloor * (liftHeight + 2)}px)`
}

