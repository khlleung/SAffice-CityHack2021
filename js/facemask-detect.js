const detectWebCam = () => {
    detect(webcamElement).then((results) => {
        console.log(results);
        console.log(webcamElement.width + " " + webcamElement.height);
        ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(webcamElement, 0, 0, canvas.width, canvas.height);

        console.log(results);
        for (bboxInfo of results) {
            bbox = bboxInfo[0];
            classID = bboxInfo[1];
            score = bboxInfo[2];

            ctx.beginPath();
            ctx.lineWidth = "3";
            if (classID == 1) {
                ctx.strokeStyle = "red";
                ctx.fillStyle = "red";
            } else {
                ctx.strokeStyle = "green";
                ctx.fillStyle = "green";
            }
            console.log(bbox);

            ctx.rect(bbox[0], bbox[1], bbox[2] - bbox[0], bbox[3] - bbox[1]);
            ctx.stroke();

            ctx.font = "15px Arial";
            const content = (classID == 1) ? `without_mask ${score}` : `with_mask  ${score}`
            ctx.fillText(content, bbox[0], bbox[1] < 20 ? bbox[1] + 30 : bbox[1] - 5);
        }

    })

    const canvasToBase64 = canvas.toDataURL();
    canvasToImage.src = canvasToBase64;

    setTimeout(() => {
        detectWebCam();
    });
}

const loadModel = async () => {
    model = await tf.loadLayersModel('model/model.json');
    return model;
}
