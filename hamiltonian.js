        var canvas = document.getElementById("canvas1");
		var ctx=canvas.getContext("2d");
		
	   // function to draw a circle
	   // if indicator =0 then color is red otherwise green
	   
	    function draw_circle(x,y,i,indicator){ 

		var radius=30;
		ctx.beginPath();
		ctx.arc(x,y,radius,0,7);
		
		if(indicator==0)
		   ctx.fillStyle="#FF8A65";
	    else
			ctx.fillStyle="#4A8";
        ctx.fill();
		
		    // to write node number
		    ctx = canvas.getContext("2d");
            ctx.font = '20pt Calibri';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText(i, x, y); 
	   }
	   
	    //function to draw edges
	    //if indicator=0 color is black else color is green
		
	    function draw_line(sx,sy,dx,dy,indicator){

		ctx.beginPath();
		ctx.moveTo(sx,sy);
		ctx.lineTo(dx,dy);
		if(indicator==0)
	      ctx.strokeStyle="black";
	    else
		  ctx.strokeStyle="#4A8";

        ctx.lineWidth=3;
		ctx.stroke();
		   
	   }

	   
	   
	   	    function submit_box()
		{
			
		    
			  ctx.lineJoin = "round";
              ctx.lineWidth = cornerRadius;
              ctx.fillStyle="#CCFF90";
              ctx.strokeStyle="#CCFF90";
              ctx.strokeRect(answer.x+(cornerRadius/2), answer.y+(cornerRadius/2), answer.w-cornerRadius, answer.h-cornerRadius);
              ctx.fillRect(answer.x+(cornerRadius/2), answer.y+(cornerRadius/2), answer.w-cornerRadius, answer.h-cornerRadius);
			  ctx.font = '20pt Calibri';
              ctx.fillStyle = 'white';
              ctx.textAlign = 'center';
			  ctx.fillText("Submit",1325,630);
			  once_submitted=true;
			  var team=document.getElementById('team_name').value;
			 
			  
			  var arr={"team":team,"moves":moves,"solution":ans};
			  $.post("server.php",arr,
				function(data)
				{
					alert(team+"\nYour answer is Submitted");
				});
			 
			 	      	
		}
	   
	   
	

    

	
       //event listener
	   function getPosition(event)
      {  
        var x = new Number();
        var y = new Number();

		
        if (event.x != undefined && event.y != undefined )
        {
		  var rect = canvas.getBoundingClientRect();
		var x = event.x - rect.left;
		var y = event.y - rect.top;
		
		  var j,k;
		  var radius=30;
		  var flag=0; 
		  	  		  
		  if(x>=answer.x && x<=answer.x+answer.w && y>=answer.y && y<=answer.y+answer.h)
		  {
			  if(once_submitted==false){
				  once_submitted=true;
			  submit_box();
			  }
		  }
		  
	       if(once_submitted==false){
		  for(j=0;j<circle.length;j++)
		  {
			  if((((x-circle[j].x)*(x-circle[j].x))+((y-circle[j].y)*(y-circle[j].y)))<=(radius*radius))
			  {
				  if(j==last_pos)
				  {
				  last_pos=parent[last_pos];
				  moves++;
				  draw_line(circle[last_pos].x,circle[last_pos].y,circle[j].x,circle[j].y,0);
				  draw_circle(circle[j].x,circle[j].y,j,0);
				  draw_circle(circle[last_pos].x,circle[last_pos].y,last_pos,1);
				  if(j!=0)
				  {  parent[j]=-1;
				     is_visited[j]=false;
					 ans[index]=-1;
					 index--;
				     flag=1;
				  }	 
			      break;
					  
				  }
			  }
		  }
		  if(flag==0)
		  { 
	      for(j=0;j<adj[last_pos].length;j++)
		  {
		
			  var a=adj[last_pos][j];
			  if(is_visited[a]==false && (((x-circle[a].x)*(x-circle[a].x))+((y-circle[a].y)*(y-circle[a].y)))<=(radius*radius))
			  {
				  draw_line(circle[last_pos].x,circle[last_pos].y,circle[a].x,circle[a].y,1);
				  draw_circle(circle[a].x,circle[a].y,a,1);
				  draw_circle(circle[last_pos].x,circle[last_pos].y,last_pos,1);
				  
				  parent[a]=last_pos;
				  last_pos=a;
				  moves++;
				  is_visited[a]=true;
				  index++;
				  ans[index]=a;
				  break;
				  
			  }
			 
		  }			  
		  }
		ctx.fillStyle="#FFEE58";  
		ctx.fillRect(1150,460,400,100); 
		ctx.fillStyle="black";
		ctx.font = 'bold 25pt Calibri';

		
	
		ctx.fillText("No of moves : ",1320,500);
		ctx.fillText(moves,1430,500);
		
		ctx.fillText("Last visited place : ",1320,550);
		ctx.fillText(last_pos,1470,550);
		
        }

      }}
	   
	   var circle=
	      [{ x:200,y:200},//0
		   { x:600,y:500},//1
		   { x:250,y:550},//2
		   { x:400,y:150},//3
		   { x:250,y:350},//4
		   { x:550,y:300},//5
		   { x:850,y:580},//6
		   { x:500,y:650},//7
           { x:100,y:100},//8   
           { x:430,y:450},//9      
		   { x:700,y:250},//10  
           { x:800,y:100},//11 
           { x:300,y:700},//12 
           { x:900,y:350},//13 
           { x:1000,y:700},//14  
           { x:100,y:400},//15   
		   ];	
		   
	   var i,last_pos=0;
	   var ans=[0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
	   var index=0;
	   var moves=0;
	   var timer_start=false;
	   var actual_ans="0-6-7-2-5-8-15-12-9-1-13-14-10-3-11-4";
       var once_submitted=false;    
	   
       var seconds = 60;
       var mins;
	   
		//to create lines   
	   draw_line(200,200,850,580,0); //0->6 
       draw_line(850,580,500,650,0);//6->7
	   draw_line(500,650,250,550,0);//7->2	  
	   draw_line(250,550,550,300,0);// 2->5	  
	   draw_line(550,300,100,100,0);//5->8	   
	   draw_line(100,100,100,400,0);//8->15	   
	   draw_line(100,400,300,700,0);//15->12		
       draw_line(300,700,430,450,0);//12->9
       draw_line(430,450,600,500,0);//9->1
       draw_line(600,500,900,350,0);//1->13	
       draw_line(900,350,1000,700,0);//13->14
       draw_line(1000,700,700,250,0);//14->10
       draw_line(700,250,400,150,0);//10->3
       draw_line(400,150,800,100,0);//3->11
	   draw_line(800,100,250,350,0);//11->4  
	   
	   
	   draw_line(200,200,250,350,0);//0->4
	   draw_line(200,200,100,400,0);//0->15
	   draw_line(250,350,500,650,0);//4->7
       draw_line(500,650,1000,700,0);//7->14
       draw_line(100,400,430,450,0);//15->9
       draw_line(550,300,900,350,0);//5->13	
       draw_line(500,650,600,500,0);//7->1	   
	   draw_line(300,700,1000,700,0);//12->14
	   draw_line(800,100,900,350,0);//11->13
	   draw_line(700,250,800,100,0);//10->11
       draw_line(600,500,550,300,0);//1->5	   
	   
	   
	   
	   
	   
	   
	   //to draw circles
	   for(i=0;i<circle.length;i++)
	   { if(i==0) 
            draw_circle(circle[i].x,circle[i].y,i,1);
		 else
			draw_circle(circle[i].x,circle[i].y,i,0);
	   } 
	   
		
	   //to create adjacency list 
	     var adj=[];
		 
       	   adj[0]=[4,6,15];
		   adj[1]=[5,7,9,13];
		   adj[2]=[5,7];
		   adj[3]=[10,11];
		   adj[4]=[0,7,11];
		   adj[5]=[1,2,8,13];
		   adj[6]=[0,7];
		   adj[7]=[1,2,4,6,14];
		   adj[8]=[5,15];
		   adj[9]=[1,12,15];
		   adj[10]=[3,11,14];
		   adj[11]=[3,4,10,13];
		   adj[12]=[9,14,15];
		   adj[13]=[1,5,11,14];
		   adj[14]=[7,10,12,13];
		   adj[15]=[0,8,9,12];
		   
        //to create is visited array
		var is_visited=[true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
		
		//to remember the parent of nodes
		var parent=[0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
		

		ctx.fillStyle="black";
		ctx.font = 'bold 25pt Calibri';
		ctx.fillText("Last visited place : "+last_pos,1320,500);	
		ctx.fillText("No of moves : "+moves,1320,550);	
		
		
		
		
	   // to draw instuctions button
	   {
        var timer_button={x:1250,y:50,w:160,h:50};
		var answer={x:1250,y:600,w:160,h:50};
        var cornerRadius=20;
		
       // Set faux rounded corners
       ctx.lineJoin = "round";
       ctx.lineWidth = cornerRadius;
       ctx.fillStyle="rgba(0,200,0,1)";
       ctx.strokeStyle="rgba(0,200,0,1)";

   
		 
		 ctx.strokeRect(answer.x+(cornerRadius/2), answer.y+(cornerRadius/2), answer.w-cornerRadius, answer.h-cornerRadius);
         ctx.fillRect(answer.x+(cornerRadius/2), answer.y+(cornerRadius/2), answer.w-cornerRadius, answer.h-cornerRadius);
		 
		    ctx.font = '20pt Calibri';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
			ctx.fillText("Submit",1325,630);
        }

		canvas.addEventListener("mousedown", getPosition, false);
		
		

            // timer 
     function countdown(minutes) {
     seconds=60;		
     mins= minutes;
     function tick() {

        var current_minutes = mins-1;
        seconds--;
		
		ctx.fillStyle="#FFEE58";  
		ctx.fillRect(1050,50,600,100); 
		
		var string = current_minutes.toString() + " mins " + (seconds < 10 ? "0" : "") + String(seconds)+" secs";
		ctx.fillStyle="black";
	    ctx.font = 'italic 30pt Calibri';
		ctx.fillText("Time Left : "+string,1280,80);
		
		
        if( seconds > 0 ) {
            setTimeout(tick, 1000);
        } else {
            if(mins > 1){
                countdown(mins-1);           
            }
			else 
			{ 
		      submit_box();
			} 
        }

      }
       tick();
     }

      
	 countdown(40);	 
	   
	 