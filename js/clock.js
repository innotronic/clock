/*
 * clock.js
 */

let clockCanvas;

document.addEventListener( 'DOMContentLoaded', () => 
{
  clockCanvas = document.querySelector( '.clock' );
  window.requestAnimationFrame( draw );
});

function draw()
{
  canvas = clockCanvas;
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  ctx = canvas.getContext( '2d' );
  
  ctx.clearRect( 0, 0, canvas.width, canvas.height );
  
  centerX = canvas.width / 2;
  centerY = canvas.height / 2;
  
  r = (( centerX < centerY ) ? centerX : centerY );
  r *= 0.9;
  
  tickHourLen = r * 0.225;
  tickHourWidth = r * 0.08;
  tickMinuteLen = r * 0.10;
  tickMinuteWidth = r * 0.02;
  
  handSecondLen = r * 0.65;
  handSecondWidth = r * 0.025;
  handSecondColor = 'red';
  handSecondRadius = r * 0.075;
  
  handMinuteLen = r * 0.90;
  handMinuteWidth = r * 0.08;
  handMinuteColor = 'black';
  
  handHourLen = r * 0.60;
  handHourWdith = r * 0.08;
  handHourColor = 'black';
  
  centerWidth = r * 0.025;
  centerColor = 'red';
  
  now = new Date();
  h = now.getHours();
  m = now.getMinutes();
  s = Math.min(( now.getSeconds() + now.getMilliseconds() / 1000 ) * 1.03, 60 );
  
  ctx.strokeStyle = 'black';
  ctx.save();
  ctx.translate( centerX, centerY );
  
  for( var i = 1; i <= 60; i++ )
  {
    a = Math.PI / 30 * i;
    sineAngle = Math.sin( a );
    cosAngle = -Math.cos( a );
    
    if( i % 5 )
    {
      //Minute Ticks
      ctx.lineWidth = tickMinuteWidth;
      iPointX = sineAngle * ( r - tickMinuteLen );
      iPointY = cosAngle  * ( r - tickMinuteLen );
      oPointX = sineAngle * ( r );
      oPointY = cosAngle  * ( r );
    }
    else
    {
      //Hour Ticks
      ctx.lineWidth = tickHourWidth;
      iPointX = sineAngle * ( r - tickHourLen );
      iPointY = cosAngle  * ( r - tickHourLen );
      oPointX = sineAngle * ( r );
      oPointY = cosAngle  * ( r );
    }
    
    ctx.beginPath();
    ctx.moveTo( iPointX, iPointY );
    ctx.lineTo( oPointX, oPointY );
    ctx.stroke();
  }
  
  
  // Hours
  a = ( Math.PI / 6 * ( h + ( m / 60 )));
  sX =  Math.sin( a ) * handHourLen;
  sY = -Math.cos( a ) * handHourLen;
  eX = -Math.sin( a ) * handHourLen * 0.50;
  eY =  Math.cos( a ) * handHourLen * 0.50;
  ctx.strokeStyle = handHourColor;
  ctx.lineWidth = handHourWdith; 
  ctx.beginPath();
  ctx.moveTo( eX, eY );
  ctx.lineTo( sX, sY );
  ctx.stroke();
  
  // Minutes
  a = ( Math.PI / 30 * m );
  sX =  Math.sin( a ) * handMinuteLen;
  sY = -Math.cos( a ) * handMinuteLen;
  eX = -Math.sin( a ) * handMinuteLen * 0.33;
  eY =  Math.cos( a ) * handMinuteLen * 0.33;
  ctx.strokeStyle = handMinuteColor;
  ctx.strokeStyle = 'black';
  ctx.lineWidth = handMinuteWidth; 
  ctx.beginPath();
  ctx.moveTo( eX, eY );
  ctx.lineTo( sX, sY );
  ctx.stroke();
  
  // Seconds
  a = Math.PI / 30 * s;
  sX =  Math.sin( a ) * handSecondLen;
  sY = -Math.cos( a ) * handSecondLen;
  eX = -Math.sin( a ) * handSecondLen * 0.40;
  eY =  Math.cos( a ) * handSecondLen * 0.40;
  ctx.strokeStyle = handSecondColor;
  ctx.lineWidth = handSecondWidth; 
  ctx.beginPath();
  ctx.moveTo( eX, eY );
  ctx.lineTo( sX, sY );
  ctx.stroke();
  
  ctx.fillStyle = handSecondColor;
  ctx.beginPath();
  ctx.arc( sX, sY, handSecondRadius, 0, 2 * Math.PI, false );
  ctx.fill();
  
  // Middle point
  ctx.beginPath();
  ctx.arc( 0, 0, centerWidth, 0, 2 * Math.PI, false );
  ctx.fillStyle = centerColor;
  ctx.fill();
  
  ctx.translate( -centerX, -centerY );
  
  window.requestAnimationFrame( draw );
}
