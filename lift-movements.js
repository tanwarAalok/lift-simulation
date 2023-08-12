let liftRequestQueue = [];
let isMoving = false;

function addRequestsToQueue(e){
    const floor = e.target.getAttribute('floor');
    const direction = e.target.getAttribute('direction');
    liftRequestQueue.push({nextFloor: floor, direction: direction});
    if(!isMoving) processQueueRequest();
}


function processQueueRequest() {
    if (liftRequestQueue.length === 0) {
        isMoving = false;
        return;
    }

    isMoving = true;

    const { nextFloor, direction } = liftRequestQueue.shift();

    moveLift(nextFloor);

    setTimeout(() => {
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

