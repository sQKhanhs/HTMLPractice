            let add=document.getElementById("add");
            let sub=document.getElementById("sub");
            let mul=document.getElementById("mul");
            let div=document.getElementById("div");
            add.addEventListener("click",addfunction);
            function addfunction(){
            let A=document.getElementById("A").value;
            let B=document.getElementById("B").value;
            let result= "Result addition: " + (Number(A)+Number(B));
            document.getElementById("check").innerHTML=result;
            }
            sub.addEventListener("click",subfunction);
            function subfunction(){
            let A=document.getElementById("A").value;
            let B=document.getElementById("B").value;
            let result= "Result subtraction: " + (Number(A)-Number(B));
            document.getElementById("check").innerHTML=result;
            }
            mul.addEventListener("click",mulfunction);
            function mulfunction(){
            let A=document.getElementById("A").value;
            let B=document.getElementById("B").value;
            let result= "Result multiplication: " + (Number(A)*Number(B));
            document.getElementById("check").innerHTML=result;
            }
            div.addEventListener("click",divfunction);
            function divfunction(){
            let A=document.getElementById("A").value;
            let B=document.getElementById("B").value;
            let result= "Result division: " + (Number(A)/Number(B));
            document.getElementById("check").innerHTML=result;
            }