// Drawing Mesh
export const drawMesh = (predictions, emotions, ctx) => {
var emo = emotions['emotion']
if (predictions.length > 0) {
    for (let i = 0; i < predictions.length; i++) {
        const start = predictions[i].topLeft;
        const end = predictions[i].bottomRight;
        const size = [end[0] - start[0], end[1] - start[1]];
  
        // Render a rectangle over each detected face.
        ctx.beginPath();
        ctx.lineWidth = "3";
        if (emo==='angry'){
          ctx.fillStyle = 'red';
        }
        else if (emo==='neutral'){
          ctx.fillStyle = 'green';
        }
        else if (emo==='happy'){
          ctx.fillStyle = 'orange';
        }
        else if (emo==='fear'){
          ctx.fillStyle = 'blue';
        }
        else if (emo==='surprise'){
          ctx.fillStyle = 'yellow';
        }
        else if (emo==='sad'){
          ctx.fillStyle = 'gray';
        }
        else {
          ctx.fillStyle = 'pink';
        }
        ctx.globalAlpha = 0.2;
        ctx.rect(start[0], start[1], size[0], size[1]);
        ctx.fillRect(start[0], start[1], size[0], size[1]);
        ctx.stroke();
        ctx.font="20px Georgia";
        ctx.textAlign="center"; 
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#000000";
        ctx.fillText(emo, start[0]+40, start[1]+15);
      }
  }
};