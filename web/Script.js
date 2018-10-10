
    var X = 175, Y = 175;   //Roulette position
    var r = 150;        //Roulette's radius
    var number = 1;     //Choice value
    var time = 50;      //If time have more value, then the pointer speed will be slower.
    var time_temp = time;
	var mod = -1;
	var monster_correct = 0;
	var man_ATK = 100 , man_HP = 300 , man_battleHP = 300;
	var monster_ATK, monster_HP ;
	var round = 1 , battle = 0;
	document.getElementById("ManAttack_getdiv").innerHTML = man_ATK;
	document.getElementById("ManHp_getdiv").innerHTML = man_HP;
	
    function getdiv_for_roulette(ID, position_X, position_Y, Width, Height, Background_Color, Text) {
        var newElement = document.createElement("div");
        newElement.style.position = "absolute";
        newElement.id = ID;
        newElement.style.left = position_X;
        newElement.style.top = position_Y;
        newElement.style.width = Width;
        newElement.style.height = Height;
        newElement.style.backgroundColor = Background_Color;
        newElement.style.color = "white";
        newElement.innerHTML = Text;
        newElement.style.fontSize = "0px";
		newElement.style.fontFamily = "Arial";
        document.getElementById("Roulette_Frame").appendChild(newElement);
    }
    function Write_roulette() {
        for (i = 1; i <= 10; i++) {
            getdiv_for_roulette
                ("choice-" + i      //ID
                , X + r * Math.cos((270 + 36 * i) * (Math.PI / 180)) - 10        //position_X
                , Y + r * Math.sin((270 + 36 * i) * (Math.PI / 180)) - 13        //position_Y
                , 15        //Width
                , 15        //Height
                , "black"       //Background_Color
                , i);       //Text
        }
        for (i = 0; i < (r - 30) ; i++) {
            getdiv_for_roulette
                ("point-" + i       //ID
                , X + i * Math.cos(270 * (Math.PI / 180))       //position_X
                , Y + i * Math.sin(270 * (Math.PI / 180))       //position_Y
                , 1     //Width
                , 1     //Height
                , "white"       //Background_Color
                , "");      //Text
        }
    }
	
    function Write_TABLE() {
        var newTable = document.createElement("TABLE");
        document.getElementById("Rule_Frame").appendChild(newTable);
        newTable.border = "1px";
        for (i = 0; i < 10; i++) {
            newTable.insertRow(i);
            for (j = 0; j < 2; j++) {
                newTable.rows[i].insertCell(j);
                cell = newTable.rows[i].cells[j];
                cell.height = "44px";       //Cell's Height
                cell.id = i + "-" + j;      //Cell's Id
                if (j == 0) {
                    cell.width = "45px"
                    cell.innerHTML = "" + (i + 1);
                }
                else {
                    cell.width = "205px";
                }
            }
        }
    }

    function Status_TABLE(mod){
		switch(mod){
		case 1:		//monster choice
		if(number == 1 || number == 2 || number == 9 || number == 10){
			for(i = 0 ; i < 10 ; i++){
                document.getElementById(i + "-" + 1).style.fontSize = "16px";
                document.getElementById(i + "-" + 1).style.fontFamily = "微軟正黑體";
                if(i == 0 || i == 9){
					document.getElementById(i + "-" + 1).innerHTML = "咬噬龍";
				}
				else if (i == 1 || i == 5){
					document.getElementById(i + "-" + 1).innerHTML = "虎獸人戰士";
				}
				else if (i == 2 || i == 6){
					document.getElementById(i + "-" + 1).innerHTML = "死靈法師";
				}
				else if(i == 3 || i == 7){
					document.getElementById(i + "-" + 1).innerHTML = "狼獸人戰士";
				}
				else if(i == 4 || i == 8){
					document.getElementById(i + "-" + 1).innerHTML = "劇毒蜈蚣";
				}
            }
		}
        break;
		case 2://kill prize
		for(i = 0 ; i < 10 ; i++){
           document.getElementById(i + "-" + 1).style.fontSize = "16px";
           document.getElementById(i + "-" + 1).style.fontFamily = "微軟正黑體";
           if(i == 0){
                document.getElementById(i + "-" + 1).innerHTML = "獲得說中的裝備";
            }
			else if(i == 1){
				document.getElementById(i + "-" + 1).innerHTML = "獲得高級的裝備";
			}
			else if(i >= 2 && i <= 4){
				document.getElementById(i + "-" + 1).innerHTML = "獲得普通的裝備";
			}
			else if(i >= 5 && i <= 7){
				document.getElementById(i + "-" + 1).innerHTML = "什麼都沒有獲得";
			}
			else if(i == 8 ){
				document.getElementById(i + "-" + 1).innerHTML = "失血/骨折";
			}
			else if(i == 9){
				document.getElementById(i + "-" + 1).innerHTML = "重傷";
			}
        }
        break;
		case 3://corps
		for(i = 0 ; i < 10 ; i++){
			document.getElementById(i + "-" + 1).style.fontSize = "16px";
			document.getElementById(i + "-" + 1).style.fontFamily = "微軟正黑體";
			if(i == 0){
				document.getElementById(i + "-" + 1).innerHTML = "獲得傳說中的裝備";
			}
			else if(i == 1){
				document.getElementById(i + "-" + 1).innerHTML = "獲得高級的裝備";
			}
			else if(i >= 2 && i <= 4){
				document.getElementById(i + "-" + 1).innerHTML = "獲得普通的裝備";
			}
			else if(i >= 5 && i <= 7){
				document.getElementById(i + "-" + 1).innerHTML = "什麼都沒有獲得";
			}
			else if(i == 8 ){
				document.getElementById(i + "-" + 1).innerHTML = "毒氣";
			}
			else if(i == 9){
				document.getElementById(i + "-" + 1).innerHTML = "大爆炸";
			}
		}
        break;
		case 4://trap
		for(i = 0 ; i < 10 ; i++){
			document.getElementById(i + "-" + 1).style.fontSize = "16px";
			document.getElementById(i + "-" + 1).style.fontFamily = "微軟正黑體";
			if(i == 0){
                    document.getElementById(i + "-" + 1).innerHTML = "獲得傳說中的裝備";
                }
                else if(i >= 1 && i <= 4){
                    document.getElementById(i + "-" + 1).innerHTML = "安然無恙";
                }
                else if(i >= 5 && i <= 7){
                    document.getElementById(i + "-" + 1).innerHTML = "毒氣";
				}
				else if(i == 8 ){
					document.getElementById(i + "-" + 1).innerHTML = "尖刺";
				}
				else if(i == 9){
					document.getElementById(i + "-" + 1).innerHTML = "大爆炸";
				}
		}
        break;
		case 5://treasure
		for(i = 0 ; i < 10 ; i++){
			document.getElementById(i + "-" + 1).style.fontSize = "16px";
			document.getElementById(i + "-" + 1).style.fontFamily = "微軟正黑體";
			if(i == 0){
				document.getElementById(i + "-" + 1).innerHTML = "獲得傳說中的裝備";
			}
			else if(i == 1){
				document.getElementById(i + "-" + 1).innerHTML = "獲得高級的裝備";
			}
			else if(i >= 2 && i <= 4){
				document.getElementById(i + "-" + 1).innerHTML = "獲得普通的裝備";
			}
			else if(i >= 5 && i <= 7){
				document.getElementById(i + "-" + 1).innerHTML = "什麼都沒有獲得";
			}
			else if(i == 8 ){
				document.getElementById(i + "-" + 1).innerHTML = "毒氣";
			}
			else if(i == 9){
				document.getElementById(i + "-" + 1).innerHTML = "大爆炸";
			}
		}
        break;
		case 0:		//combat mod
			for(i = 0 ; i < 10 ; i++){
                document.getElementById(i + "-" + 1).style.fontSize = "16px";
                document.getElementById(i + "-" + 1).style.fontFamily = "微軟正黑體";
                if(i == 0){
					document.getElementById(i + "-" + 1).innerHTML = "攻擊力 X 3";
				}
				else if (i == 1){
					document.getElementById(i + "-" + 1).innerHTML = "攻擊力 X 2";
				}
				else if (i >= 2 && i <= 4){
					document.getElementById(i + "-" + 1).innerHTML = "攻擊力 X 1";
				}
				else if(i >= 5 && i <= 8){
					document.getElementById(i + "-" + 1).innerHTML = "miss";
				}
				else if(i == 9){
					document.getElementById(i + "-" + 1).innerHTML = "被自身攻擊反噬";
				}
            }
            break;
		default:
			for(i = 0 ; i < 10 ; i++){
                document.getElementById(i + "-" + 1).style.fontSize = "16px";
                document.getElementById(i + "-" + 1).style.fontFamily = "微軟正黑體";
                if(i >= 0 && i <= 1){
					document.getElementById(i + "-" + 1).innerHTML = "戰鬥";
				}
				else if (i >= 2 && i <= 3){
					document.getElementById(i + "-" + 1).innerHTML = "屍體";
				}
				else if (i >= 4 && i <= 5){
					document.getElementById(i + "-" + 1).innerHTML = "寶箱";
				}
				else if(i >= 6 && i <= 7){
					document.getElementById(i + "-" + 1).innerHTML = "機關";
				}
				else if(i >= 8){
					document.getElementById(i + "-" + 1).innerHTML = "戰鬥";
				}
            }
            break;
		}
	}
	
	function Manability( hp , atk ){
		var hp_var = man_HP + hp;
		var atk_var = man_ATK + atk;
		man_HP = hp_var;
		man_ATK = atk_var;
		if(hp_var <= 0)
			hp_var = 0;
		document.getElementById("ManAttack_getdiv").innerHTML = atk_var;
		document.getElementById("ManHp_getdiv").innerHTML = hp_var;
	}
	
	function Enemyability( hp , atk){
		var hp_var = monster_HP + hp;
		var atk_var = monster_ATK + atk;
		monster_HP = hp_var;
		monster_ATK = atk_var;
		if(hp_var <= 0)
			hp_var = 0;
		document.getElementById("EnemyAttack_getdiv").innerHTML = atk_var;
		document.getElementById("EnemyHp_getdiv").innerHTML = hp_var;
	}
	function Round_display(){
		if(round == 1)
			document.getElementById("round").innerHTML = "我方";
		else
			document.getElementById("round").innerHTML = "敵方";
	}
	function treasure_background_show(){
		$(document).ready(function () {
			$("#chest").show();
		});
	}
	function treasure_show(){
		if(number == 1)
		{
			$(document).ready(function () {
				$("weapon_1").show();
			});
		}
		else if(number == 2)
		{
			$(document).ready(function () {
				$("#armor_1").show();
			});
		}
		else if(number >=3 && number <= 5)
		{
			$(document).ready(function () {
				$("#armor_2").show();
			});
		}
	}
	function treasure_hide(){
		$(document).ready(function () {
			$("#chest").hide();
		});
		$(document).ready(function () {
			$("weapon_1").hide();
		});
		$(document).ready(function () {
			$("#armor_1").hide();
		});
		$(document).ready(function () {
			$("#armor_2").hide();
		});
	}
	
	function corps_background_show(){
		$(document).ready(function () {
			$("#body").show();
		});
	}
	function corps_show(){
		if(number == 1)
		{
			$(document).ready(function () {
				$("weapon_1").show();
			});
		}
		else if(number == 2)
		{
			$(document).ready(function () {
				$("#armor_1").show();
			});
		}
		else if(number >=3 && number <= 5)
		{
			$(document).ready(function () {
				$("#armor_2").show();
			});
		}
		else if(number == 9)
		{
			$(document).ready(function () {
				$("#trap_4").show();
			});
		}
		else if(number == 10)
		{
			$(document).ready(function () {
				$("#trap_5").show();
			});
		}
	}
	function corps_hide(){
		$(document).ready(function () {
			$("#body").hide();
		});
		$(document).ready(function () {
			$("weapon_1").hide();
		});
		$(document).ready(function () {
			$("#armor_1").hide();
		});	
		$(document).ready(function () {
			$("#armor_2").hide();
		});
		$(document).ready(function () {
			$("#trap_4").hide();
		});
		$(document).ready(function () {
			$("#trap_5").hide();
		});
	}
	
	function trap_background_show(){
		$(document).ready(function () {
			$("#body").show();
		});
	}
	function trap_show(){
		if(number == 1)
		{
			trap_hide();
			$(document).ready(function () {
				$("#trap_1").show();
			});
		}
		else if(number >= 6 && number <= 8)
		{
			trap_hide();
			$(document).ready(function () {
				$("#trap_4").show();
			});
		}
		else if(number == 9)
		{
			trap_hide();
			$(document).ready(function () {
				$("#trap_2").show();
			});
		}
		else if(number == 10)
		{
			trap_hide();
			$(document).ready(function () {
				$("#trap_5").show();
			});
		}
	}
	function trap_hide(){
		$(document).ready(function () {
			$("#body").hide();
		});
		$(document).ready(function () {
			$("#trap_1").hide();
		});
		$(document).ready(function () {
			$("#trap_2").hide();
		});
		$(document).ready(function () {
			$("#trap_4").hide();
		});
		$(document).ready(function () {
			$("#trap_5").hide();
		});
	}
	
	function main_show(){
		$(document).ready(function () {
			$("#main").show();
		});
	}
	function main_hide(){
		$(document).ready(function () {
			$("#main").hide();
		});
	}
	
	function monster_show(){
		if(number == 1 || number == 10){
			$(document).ready(function () {
				$("#background_ground").show();
			});
			$(document).ready(function () {
				$("#monster_dragon").show();
			});
			monster_correct = number;
		}
		else if(number == 3 || number == 7){
			$(document).ready(function () {
				$("#background_rockfloor").show();
			});
			$(document).ready(function () {
				$("#monster_bone").show();
			});	
			monster_correct = number;
		}
		else if(number == 2 || number == 6){
			$(document).ready(function () {
				$("#background_rockfloor2").show();
			});
			$(document).ready(function () {
				$("#monster_weretiger").show();
			});	
			monster_correct = number;
		}
		else if(number == 4 || number == 8){
			$(document).ready(function () {
				$("#background_rockfloor4").show();
			});
			$(document).ready(function () {
				$("#monster_werewolf").show();
			});	
			monster_correct = number;
		}
		else if(number == 5 || number == 9){
			$(document).ready(function () {
				$("#background_rockfloor5").show();
			});
			$(document).ready(function () {
				$("#monster_insect").show();
			});	
			monster_correct = number;
		}
	}
	function monster_hide(){
		$(document).ready(function () {
			$("#background_ground").hide();
		});
		$(document).ready(function () {
			$("#monster_dragon").hide();
		});
		$(document).ready(function () {
			$("#background_rockfloor").hide();
		});
		$(document).ready(function () {
			$("#monster_bone").hide();
		});	
		$(document).ready(function () {
			$("#background_rockfloor2").hide();
		});
		$(document).ready(function () {
			$("#monster_weretiger").hide();
		});
		$(document).ready(function () {
			$("#background_rockfloor4").hide();
		});
		$(document).ready(function () {
			$("#monster_werewolf").hide();
		});
		$(document).ready(function () {
			$("#background_rockfloor5").hide();
		});
		$(document).ready(function () {
			$("#monster_insect").hide();
		});	
	}

    function move() {
        number++;
        if (number > 10) {
            number = 1;
        }

        /*Move pointer*/

        document.getElementById("point-" + number)
        for (i = 0; i < (r - 30) ; i++) {
            point_X = X + i * Math.cos((number * 36 - 90) * (Math.PI / 180));
            point_Y = Y + i * Math.sin((number * 36 - 90) * (Math.PI / 180));
            document.getElementById("point-" + i).style.left = point_X;
            document.getElementById("point-" + i).style.top = point_Y;
        }

        /*Change number font-size*/

        var Id = [];
        for (i = 0; i < 7; i++) {
            temp = number - 3 + i;
            if (temp < 1) {
                temp += 10;
            }
            else if (temp > 10) {
                temp -= 10;
            }
            Id[i] = "choice-" + temp;
        }
        document.getElementById(Id[0]).style.fontSize = "0px";
        document.getElementById(Id[1]).style.fontSize = "10px";
        document.getElementById(Id[2]).style.fontSize = "20px";
        document.getElementById(Id[3]).style.fontSize = "30px";
        document.getElementById(Id[4]).style.fontSize = "20px";
        document.getElementById(Id[5]).style.fontSize = "10px";
        document.getElementById(Id[6]).style.fontSize = "0px";
		
		
		if(number == 1){
			document.getElementById((number - 1 + 9) + "-" + 0).style.backgroundColor = "black";
		}
		else{
			document.getElementById((number - 2) + "-" + 0).style.backgroundColor = "black";
		}
		document.getElementById((number - 1) + "-" + 0).style.backgroundColor = "red";
    }

    run = setInterval("move()", time)

    function time_increase() {
        time_temp *= 2;
        if (time_temp < Math.pow(2, 5) * time) {
            clearInterval(run);
            run = setInterval("move()", time_temp);
        }
        else {
            stop();
        }
    }

    function run_stop() {
        for (i = 1; i <= 5; i++) {
            setTimeout("time_increase()", 1000 * i);
        }
    }

    function run_start() {
        run = setInterval("move()", time);
        $(document).ready(function () {
            $("button").toggle();
        });
    }

    function stop() {
        time_temp = time;
        clearInterval(run);
        $(document).ready(function () {
            $("#next_run").show();
        });
		
		
		if(mod == 1){	//monster
			monster_show();
			main_hide();
			switch(number){
			case 1:
				monster_HP = 1 * 50;
				monster_ATK = 1 * 5;
				break;
			case 2:
				monster_HP = 2 * 50;
				monster_ATK = 2 * 5;
				break;
			case 3:
				monster_HP = 3 * 50;
				monster_ATK = 3 * 5;
				break;
			case 4:
				monster_HP = 4 * 50;
				monster_ATK = 4 * 5;
				break;
			case 5:
				monster_HP = 5 * 50;
				monster_ATK = 5 * 5;
				break;
			case 6:
				monster_HP = 6 * 50;
				monster_ATK = 6 * 5;
				break;
			case 7:
				monster_HP = 7 * 50;
				monster_ATK = 7 * 5;
				break;
			case 8:
				monster_HP = 8 * 50;
				monster_ATK = 8 * 5;
				break;
			case 9:
				monster_HP = 9 * 50;
				monster_ATK = 9 * 5;
				break;
			case 10:
				monster_HP = 10 * 50;
				monster_ATK = 10 * 5;
				break;
			}
			mod = 0;
			Status_TABLE(mod);
			Round_display();
			document.getElementById("EnemyAttack_getdiv").innerHTML = monster_ATK;
			document.getElementById("EnemyHp_getdiv").innerHTML = monster_HP;
		}
		if(mod == 0){	//combat and if monster dead
			man_battleHP = man_HP;
			if(battle > 0 )
			{
				if(round == 1)// man round
				{
					round = 0;
					if(number == 1)
						Enemyability(-man_ATK*3 , 0);
					else if(number == 2)
						Enemyability(-man_ATK*2 , 0);
					else if(number >= 3 && number <= 5)
						Enemyability(-man_ATK , 0);
					else if(number == 10)
						Enemyability(-monster_ATK , 0);
				}
				else//enemy round
				{
					round = 1;
					if(number == 1)
						Manability(-monster_ATK*3 , 0);
					else if(number == 2)
						Manability(-monster_ATK*2 , 0);
					else if(number >= 3 && number <= 5)
						Manability(-monster_ATK , 0);
					else if(number == 10)
						Manability(-man_ATK , 0);
				}
			}
			if(man_HP <= 0)
			{
				alert("Game Over!");
			}
			if(monster_HP <= 0){
				battle = 0;
				mod = 2;
				man_HP = man_battleHP;
				monster_hide();
				treasure_background_show();
				Status_TABLE(mod);
				document.getElementById("EnemyAttack_getdiv").style.display = none;
				document.getElementById("EnemyHp_getdiv").style.display = none;
			}
			battle++;
			Round_display();
			Status_TABLE(mod);
			
		}
		
		if(mod == 2){ //prize
			mod = -1;
			Status_TABLE(mod);
			treasure_show();
			if(number == 1){
				Manability( 50 , 25 );
			}
			else if(number == 2){
				Manability( 20 , 10 );
			}
			else if(number >=3 && number <= 5){
				Manability( 10 , 5 );
			}
			else if(number == 9){
				Manability( -5 , -5 );
			}
			else if(number == 10){
				Manability( -10 , -5 );
			}
		}
		if (mod == 3){	//corps
			mod = -1;
			Status_TABLE(mod);
			corps_show();
			if(number == 1){
				Manability( 50 , 25 );
			}
			else if(number == 2){
				Manability( 20 , 10 );
			}
			else if(number >=3 && number <= 5){
				Manability( 10 , 5 );
			}
			else if(number == 9){
				Manability( -5 , 0 );
			}
			else if(number == 10){
				Manability( -10 , 0 );
			}
		}
		if(mod == 4){ // trap
			mod = -1;
			trap_show();
			if(number == 1){
				mod = 3;
				Status_TABLE(mod);
				corps_background_show();
				trap_hide();
			}
			else if(number >= 6 && number <= 8){
				Status_TABLE(mod);
				Manability( -5 , 0 );
			}
			else if(number == 9){
				Status_TABLE(mod);
				Manability( -10 , 0 );
			}
			else if(number == 10){
				Status_TABLE(mod);
				Manability( -20 , 0 );
			}
			
		}
		if(mod == 5){ //treasure
			mod = -1;
			Status_TABLE(mod);
			treasure_show();
			if(number == 1){
				Manability( 50 , 25 );
			}
			else if(number == 2){
				Manability( 20 , 10 );
			}
			else if(number >=3 && number <= 5){
				Manability( 10 , 5 );
			}
			else if(number == 9){
				Manability( -5 , 0 );
			}
			else if(number == 10){
				Manability( -10 , 0 );
			}
		}
		if(mod == -1){
			corps_hide();
			trap_hide();
			treasure_hide();
			if(number < 3 || number > 8){ // show the combat mode
				mod = 1;
				main_show();
			}
			else if(number >= 3 && number <= 8){ // show the body , treasure , trap mode
				if(number == 3 || number == 4)
				{
					mod = 3;
					corps_background_show();
				}
					
				else if(number == 5 || number == 6)
				{
					mod = 5;
					treasure_background_show();
				}
					
				else if(number == 7 || number == 8)
				{
					mod = 4;
					trap_background_show();
				}
					
			}
			Status_TABLE(mod);
		}
	}

    $(document).ready(function () {
        $("#next_run").hide();
    });
    $(document).ready(function () {
        $("#stop").click(function () {
            $("#stop").hide();
        });
    });
	