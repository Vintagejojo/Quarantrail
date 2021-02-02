//Save Function (local storage)
//Keep track of inventory
//Keep track of what the players health level was at
//Keep track of what the players sanity level was at
//Scene the player was last on

const textElement = document.getElementById("text");
const optionButtonElement = document.getElementById("option_buttons");
let inventoryPouch =
  JSON.parse(localStorage.getItem("saveData.inventory")) || {}; //This is going to be the characters inventory (state)

//Health Functionality below
let playerHealth = document.getElementById("health");
let playerSanity = document.getElementById("sanity");



//@# HEALTH GOAL;
// playerHealth.value = option.healthAmount
playerHealth.value =
  JSON.parse(localStorage.getItem("saveData.healthPoints")) || 100;

let saveData;

if (JSON.parse(localStorage.getItem(saveData))) {
  saveData = JSON.parse(localStorage.getItem(saveData));
} else {
  saveData = {
    inventory: null,
    healthPoints: null,
    sanityPoints: null,
    lastScene: null,
  };
}

function saveGame(option) {
  saveData.inventory = inventoryPouch;
  saveData.healthPoints = playerHealth.value;
  // saveData.sanityPoints = mentalHealth.value
  saveData.lastScene = option.nextScene;
  localStorage.setItem("saveData", JSON.stringify(saveData));
}


//
function gameStart() {
  inventoryPouch = {};
  let startingPoint =
    JSON.parse(localStorage.getItem(saveData.lastScene)) || "scene1";
  showTextScene(startingPoint);
  playerHealth.value = 100;
  endings()
  // showSceneSlide()
}

// potential canvas functionality below

// const canvas = document.querySelector('canvas');
// const ctx = canvas.getContext('2d');
// ctx.fillStyle = 'green';
// ctx.fillRect(50, 50, 300, 300);

// End of Canvas example

//Function below displays the text scene in the scene container represented in HTML
function showTextScene(textNodeIndex) {
  // NODE INDEX = STRING;  STRING = CORRESPONDING SCENE OBJECT ID; TEXT SCENE = CHOSEN SCENE FROM ARRAY
  const textScene = textScenes.find(
    (textScene) => textScene.id === textNodeIndex
  );
  textElement.innerText = textScene.text;
  showSceneSlide(textScene);
  // REMOVES HTML DOM OPTION BUTTONS
  while (optionButtonElement.firstChild) {
    optionButtonElement.removeChild(optionButtonElement.firstChild);
  }


  //    @@ Creating button from TextScene.options.text
  //this builds on the showOption function 
  textScene.options.forEach((option) => {
    if (showOption(option)) {
      const button = document.createElement("button");
      button.innerText = option.text;
      button.classList.add("btn");
      button.addEventListener("click", () => selectOption(option));
      optionButtonElement.appendChild(button);
    }
  });
}


//url is the name of the objects property
//Visual aid code below. Will show images
//object destructuring below - Will
function showSceneSlide({ url }) {
  let sceneContainer = document.querySelector(".scene_container");
  if (sceneContainer.firstChild) {
    sceneContainer.removeChild(sceneContainer.firstChild);
  }
  if (url) {
    const slideImage = document.createElement("img");
    slideImage.src = url;
    sceneContainer.appendChild(slideImage);
  }
}


///
function showOption(option) {
  return option.requiredItem == null || option.requiredItem(inventoryPouch);
}



//Code that allows you to select options, and specifiic scenarios
function selectOption(option) {
  if (option.text == "Start Over") {
    return gameStart();
  } else if (option.text == "Become one with the void") {
    return gameStart();
  }

  else if (option.text == "Lets finish this" && playerSanity.value <= 50) {
    return showTextScene("Dark_end");
 } else if (option.text == "Lets finish this" && playerSanity.value >= 51) {
   return showTextScene("Good_end");
 } else if (option.text == "Conclusion" && playerSanity.value <= 50) {
    return showTextScene("The_dark");
 } else if (option.text == "Conclusion" && playerSanity.value >= 51) {
   return showTextScene("The_truth");
 }

  const nextTextSceneId = option.nextScene;
  inventoryPouch = Object.assign(inventoryPouch, option.setItem);
  if (option.healthPoints) {  //if statement allows the options to dictate the health value
    manageHealth(option);
  }

  if (option.sanityPoints) {
    manageSanity(option);
  }

  if (playerHealth.value <= 0) {
    return; //bailing out of showing next scene when no health;
  }
  saveGame(option);
  showTextScene(nextTextSceneId);
}

function manageSanity(option) {
  playerSanity.value += option.sanityPoints; // displays sanity and reflects value based on option
}

function manageHealth(option) {
  playerHealth.value += option.healthPoints;  //displays 
  // Making sure Health Value max is enforced and not allowed over 100;
  playerHealth.value >= 100 ? (playerHealth.value = 100) : playerHealth.value; //caps the health at 100.

  //Writing the same ternary for Sanity for extra coverage 
  playerSanity.value >= 100 ? (playerSanity.value = 100) : playerHealth.value;

  //@# styling progress bar example if desired; Not functional... just some styling ideas for turning progress green, yellow, red etc;

  // let health = playerHealth.value
  // if (health> 0 && health < 35) {
  // progressBar.classList.remove('health-good')
  // progressBar.classList.remove('health-medium')
  // progressBar.classList.add('health-danger')
  // } else if (health >= 35 && health <= 70) {
  // progressBar.classList.remove('health-danger')
  // progressBar.classList.remove('health-good')
  // progressBar.classList.add('health-medium')
  // } else {
  // progressBar.classList.remove('health-danger')
  // progressBar.classList.remove('health-medium')
  // progressBar.classList.add('health-good')
  // }
  checkForGameOver();
}

function checkForGameOver() {
  if (playerHealth.value <= 0) {
    showTextScene("gameoverScene");
  }
}






const textScenes = [
  // SCENE 1
  {
    id: "scene1",
    text:
      "You wake up with a groggy feeling. It is early in the morning. You are in the woods....How did you get here?",
    url: "./img/deepforest.jpg",
    //This is the text that displays on the screen
    options: [
      {
        text: "Get Up", //Options to move on. Option 1
        nextScene: "scene2",
        healthPoints: -35,
        sanityPoints: 100,
      },
      ],
  },
  // SCENE 2
  {
    id: "scene2",
    text:
      "Your whole body feels stiff and your mind is hazy. You can't recall how you got to these woods, but as you look around it seems familar. There's a nearby stump that has an olive drab backpack next to it. You have the feeling that the backpack is yours",
    url: "./img/deepforest.jpg",
    options: [
      {
        text: "Grab the backpack",
        nextScene: "adventurestarts",
      },
      {
        text: "Ignore the backpack and set out on you quest for answers",
        nextScene: "nobackpackfailure",
      },
    ],
  },

  {
      id: "nobackpackfailure",
      text: "You decide to head out and search for some answers. Who needs a backpack anyway? You pick a random direction and start to walk towards it. Eventually you reach a clearing and see a large bear about 10 yards away from you eating berries from a nearby bush.",
      url: "./img/1_t7GF_VlFMyRP03itAd2itg.jpeg",
      options: [
          {
              text: "Try to sneak by the bear",
              nextScene: "beardeath",
          },
          {
              text: "Nope on out of there",
              nextScene: "nope_conclusion", // => backpackrouundtwo

          }
      ],
  },

  {
    id: "nope_conclusion",
    text: "You decide to nope out of there. You don't have any supplies on you. There's not much you can do against a raging bear. You would be marching to your death....",
    url: "./img/bear_death.jpg",
    options: [
        {
            text: "Continue",
            nextScene: "backpackroundtwo",
        },

    ],
  },

  {
    id: "backpackroundtwo",
    text: "A smart man or woman once told you to pick your battles. Your memory is still foggy so you don't really know where the quote originated from, but it for sure applies here. This forest has a very familiar but forboding aura. You'd best not pick your luck. You turn tail and head towards the backpack. ",
    url: "./img/backpack.jpg",
    options: [
        {
            text: "Grab the backpack",
            nextScene: "adventurestarts",
        },
    ],
  },

  {
    id: "adventurestarts",
    text: "Now that you have your trusty backpack, you feel more prepared. There is an eerie chill in the air. You feel like you're being watched. The groggy feeling you felt when you first came to in these strange woods persists. You'd best get your bearings and formulate a plan.",
    url: "./img/forestphoto-1.jpg",
    options: [
        {
            text: "Check Backpack for Supplies.",
            nextScene: "backpackrundown",
            setItem: { switchBlade: true, cellPhone: true, emptyCanteen: true }
        },
    ],
  },
  {
    id: "backpackrundown",
    text: "As you unzip your bag, you think of how nice it would be to be eating a juicy burger....Well there's definitely no burgers in your bag but you do find a phone, a switchblade, and a empty canteen. There is also some lint and empty candy wrappers in there. Not much use to you at the moment.",
    url: "./img/nomad-details.jpg",
    options: [
        {
            text: "Use Knife",
            healthPoints: -15,
            sanityPoints: -8,
            nextScene: "a_sharp_decision",
        },
        {
            text: "Check Phone",
            nextScene: "phone_revelation",
        },
        {
          text: "Press On",
          nextScene: "dumb_hero_presses_on",
          healthPoints: -40,
        }
    ],
  },

  {
    id: "dumb_hero_presses_on",
    text: "Even though you have a thirst for answers, You decide to put your phone away, pick a direction and start hoofing it. Who cares? If you just pick a direction and keep hoofing it. You're bound to find your way. You start trotting in a random direction and after about a dozen paces or so, you trip and hit your head on a rock. A critical hit. Mayyyyyybe you should pull out your phone and try to contact someone.",
    url: "./img/woods_walk_away.jpg",
    options: [
        {
            text: "Check Phone...?",
            nextScene: "phone_revelation",
        },

        {
          text: "P-press on...",
          nextScene: "I_wanna_go_home",
        }
    ],
  },

  {
    id: "a_sharp_decision",
    text: "You examine the blade. It definitely feels like yours...Why can't you remember anything? As you ponder how you got in this strange forest, you start to feel strange. A strange feeling comes over you and without really thinking about it you grip the blade tightly in your right hand and cut yourself deep in your left arm. Why in the world would you do that....?",
    url: "./img/seppuku3feat2.jpg",
    options: [
        {
            text: "Use Phone",
            nextScene: "phone_revelation",
        },
    ],
  },

  {
    id: "phone_revelation",
    text: "The phone has a familar weight to it. Theres plenty of  battery and decent service. You scroll through your contacts. The name Michael stands out to you.  Your brain is still foggy, but the name seens familiar. You decide to call them...... The connection is staticy and just continues to ring and ring.",
    url: "./img/phone_call.jpg",
    options: [
        {
            text: "Call Again",
            nextScene: "phone_revelation_cont",
        },
    ],
  },

  {
    id: "phone_revelation_cont",
    text: "You try to call Michael again. The phone answers on the first ring. Theres nothing but silence on the other end.",
    url: "./img/phone_call.jpg",
    options: [
        {
            text: "Say Hello",
            nextScene: "a_friendly_chat",
        },
        {
            text: "Stay Silent",
            nextScene: "a_friendly_chat",
        },
    ],
  },

  {
    id: "a_friendly_chat",
    text: "You hear a familar voice on the other end. He speaks but sounds nervous. \"Hey boss how's it going......? What!? Oh my gosh i think I have my days mixed up, do you need me to come in?\" You get the vibe that something is wrong. Any attempts to speak are ignored as he continues to ramble and apologize to you as if you're his boss. You feel your phone vibrate during the exchange and look to check it. It's a text message from Micah. \`YOU NEED TO RUN\` it says in all caps. Your sense of dread heightens. You wait for a break in his speech and, in your most official sounding voice, tell Micah to not worry about coming in. Micah thanks you and quickly gets off the phone. ",
    url: "./img/phone_revelation.jpg",
    options: [
        {
            text: ".....",
            nextScene: "hero_presses_on",
        },
    ],
  },

  {
    id: "hero_presses_on",
    text: "Something feels off about all of this. Your brain feels foggy. Any attempts to remember how you got here bears no fruit. You're kind of hungry. Something about the call feels off. You don't think you can deal with this anymore....",
    url: "./img/knife_death.jpg",
    options: [
        {
            text: "Press on and examine youre surroundings.",
            nextScene: "examine_scene",
        },

        {
          text: "Use your blade to end it all.",
          nextScene: "a_sharp_death",
        }
    ],
  },

  {
    id: "a_sharp_death",
    text: "You can't take this anymore. The confusion, the dense forest.....It's too much to bear. You pull out your blade and stare at it ominously....",
    url: "./img/knife_death.jpg",
    options: [
        {
            text: "Give yourself the big chop",
            nextScene: "bigpain",
            healthPoints: -100,
        },

        {
          text: "What are you doing.....",
          nextScene: "hero_presses_on",
        }
    ],
  },

  {
    id: "examine_scene",
    text: "You examine your surroundings. This forest is dense. The kind of dense to where the trees above block sunlight. You hear the faint sound of rushing water in the distance. Fainter still is the sound of some kind of commotion behind you.",
    url: "./img/forestphoto_2.jpg",
    options: [
        {
            text: "Head Towards the commotion",
            nextScene: "commotion_scene",
        },

        {
          text: "Head Towards the water source",
          nextScene: "water_scene",
        }
    ],
  },

  {
    id: "water_scene",
    text: "You start walking towards the sound of water. As the sound gets closer, you begin to realize how truly thirsty you are. You can almost taste it. You're off the beaten path now. The brush foliage is incredibly dense up ahead, but crisp water is almost at your fingertips. Finally, you make it to a about 4 feet in diameter. You wonder how far it goes. Upstream you see a bunch of rocks forming a makeshift dam that is blocking the flow of the water some. It make for a nice natural filtration system.",
    url: "./img/creek.jpg",
    options: [
        {
            text: "Drink the water and collect some for later",
            nextScene: "time_to_head_back",
            setItem: {emptyCanteen: false, fullCanteen: true}
        },

        {
          text: ".....But what if you die of dysentery?",
          sanityPoints: -5,
          nextScene: "time_to_head_back",
        }
    ],
  },

  {
    id: "time_to_head_back",
    text: "It's time to bo back the way you came. You turn around and....was the path you came from that dense before? Its...hard to say. As you start to push towards the dense foliage to return to the trail, you run into various thorns and snags along the way....How did you not encounter any of this last time? Was this really the way you came from?",
    url: "./img/thorns.jpg",
    options: [
        {
            text: "keep pushing",
            nextScene: "foliage_push",
            healthPoints: -5,
            sanityPoints: -5,
        },
    ],
  },

  {
    id: "foliage_push",
    text: "It's becoming very hard to keep pushing forward......",
    url: "./img/thorns.jpg",
    options: [
        {
            text: "Never give up! Never Surrender! (push through the foliage using grit)",
            nextScene: "tackler_of_bushes",  //this leads to commotion scene
            healthPoints: -5,
            sanityPoints: -5,
        },

        {
          text: "Use your knife to slash your way through the foliage",
          requiredItem: (currentItem) => currentItem.switchBlade,
          nextScene: "slasher_of_bushes",  //heading towards commotion scene
        }
    ],
  },

  {
    id: "slasher_of_bushes",
    text: "You slash through the bushes through sheer force of will. You swing a little to wildly emulating adventure books you may have read long ago, the blade goes flying. That was not a very sane thing to do. You spend what feels like half an hour looking for it. This is a drag. Oh well. Giving up, you continue out of the clearing.",
    url: "./img/slash_bushes.jpg",
    options: [
        {
            text: "Press on, feeling like a loser",
            sanityPoints: -5,
            nextScene: "commotion_scene",
            setItem: {switchBlade: false}
        },
    ],
  },

  {
    id: "tackler_of_bushes",
    text: "You push through the bushes through sheer force of will. It was not a very sane thing to do, but upon reflection, it made you feel good to show that foliage whose boss. You seem to have come back to the trail you were on before. Awesome!",
    url: "./img/thorn_tackls.jpg",
    options: [
        {
            text: "Press on, feeling like a boss.",
            sanityPoints: +5,
            nextScene: "commotion_scene",
        },
    ],
  },



  {
    id: "commotion_scene",
    text: "You walk for a while until you reach a clearing. You find a stream with clean water and some bushes with berries. The hunger is real. Also, there are various rocks scattered about.",
    url: "./img/forestphoto_2.jpg",
    options: [
        {
            text: "Eat the berries",
            nextScene: "commotion_is_closer_scene",
            healthPoints: +10,
        },

        {
          text: "Ignore the berries. Could be poisonous.",
          nextScene: "commotion_is_closer_scene",
        },

        {
          text: "Yolo, eat the berries and take the rocks. Could come in handy.",
          setItem: {  bundleOfRocks: true}, 
          healthPoints: +10,
          nextScene: "commotion_is_closer_scene",
        }
    ],
  },

  {
    id: "commotion_is_closer_scene",
    text: "The commotion sounds closer, Maybe I should head that way. ",
    url: "./img/forestphoto_2.jpg",
    options: [
        {
            text: "Head towards the commotion",
            nextScene: "hoofing_it",
        },
    ],
  },

  {
    id: "hoofing_it",
    text: "You start walking the trail heading towards the commotion. It's really peaceful in this forest, with just a hint of creepy. As you walk you realize you misjudged the distance of the commotion. You keep trotting along the path and see a bunch of garbage of to the side of the path that you are walking on.",
    url: "./img/woods_walk_away.jpg",
    options: [
        {
            text: "Examine the garbage",
            healthPoints: -5,
            nextScene: "one_mans_trash",
        },

        {
          text: "Ignore the filth.",
          nextScene: "hoofing_it_cont",
        }
    ],
  },

  {
    id: "one_mans_trash",
    text: "You are a little too gungho about rummaging through the garbage. As you reach into pile, you cut yourself on a sharp piece of glass....Hope you got your tetanus shot. Who left it all of this stuff here? The pile of garbage seems.....Deliberate. You wonder who put all of this trash here. You see other piles of smoldering ash scattered about. And the stench is strong. Who was out here burning these piles of trash? You see various pieces of sticks, glass, tubings, and leather. You wonder if you should try to take what you can. The leather, and tubings seem to be in decent condition, and who doesn't love a good stick? ",
    url: "./img/junk.jpg",
    options: [
        {
            text: "Take the filth and become a FilthKing",
            nextScene: "hoofing_it_cont",
            setItem: {leatherStrips: true, sturdyStick: true, tubings: true},
        },

        {
          text: "This is silly. Lets get back to walking.",
          nextScene: "hoofing_it_cont",
        }
    ],
  },

  {
    id: "hoofing_it_cont",
    text: "You feel like you've been walking forever. How long has it been? The forest is so dense that its hard to gauge where the sun is....There are various animal noises all around you. Wasn't it quiet before? Maybe it would be smart to get your bearings before you continue on. A weapon would be lovely. ",
    url: "./img/slingshot.jpg",
    options: [
        {
            text: "Make a slingshot",
            nextScene: "commotion_closer",
            requiredItem: (currentItem) => currentItem.leatherStrips + currentItem.sturdyStick + currentItem.tubings ,
                           setItem: {leatherStrips: false, sturdyStick: false, tubings: false, slingShot: true},
        },

        {
          text: "Press on. NO FEAR.",
          nextScene: "commotion_closer",
        },

        {
          text: "Grab a handful of rocks from the forest floor.",
          setItem: {bundleOfRocks: true},
          nextScene: "commotion_closer",
        }
    ],
  },

  {
    id: "commotion_closer",
    text: "You feel as though whatever decisions you have made up until this point will have consequences. You.....just can't shake the feeling that you're being tailed...or watched...or hunted. You become lost in thought as you walk in the direction of the commotion, and before you know it, the sound is only a dozen yards away. It's voices...",
    url: "./img/man_facing_darkness.jpg",
    options: [
        {
            text: "continue",
            nextScene: "the_people",
        },

    ],
  },

  {
    id: "the_people",
    text: "You start walking towards the commotion. You hear voices. You continue to walk for a while until you make it to a clearing. Right past it you see 3 people. 2 guys standing and one who appears to be lying down next to them. They seem to be dressed funny. In all white. Almost as if they are covered in trash bags.",
    url: "./img/hazmat_inspection.jpg",
    options: [
        {
            text: "Call out for help",
            nextScene: "a_bad_call",
            sanityPoints: -10,
        },

        {
          text: "Observe them for a while.",
          nextScene: "observation",
        }
    ],
  },

  {
    id: "oservation",
    text: "You observe them for a while. The two guys in hazmats are looming over a woman with tattered clothes. Upon closer inspection, she appears to be dead...One of the guys nudges the woman with their foot and rolls her on her back and shines their mounted flashlight in her face for a few seconds...\"Kill confirmed. Still looking for the other target,\" You hear a voice bark into their walkie. The voice sounds familiar. It makes your's skin crawl just hearing it. They start to move away from their position. You want to get a closer look at the woman. Maybe she holds a clue to what's going on here.",
    url: "./img/hazmat_inspection.jpg",
    options: [
        {
            text: "Next",
            nextScene: "not_so_badCall",
            sanityPoints: -10,
        },

    ],
  },

  {
    id: "not_so_badCall",
    text: "You prepare to slowly advance towards the clearing where the woman is. You're throat is dry. You could use something to drink....",
    url: "",
    options: [
        {
            text: "Next",
            nextScene: "not_so_badCall",
            sanityPoints: -10,
        },

        {
          text: "Take a drink and then advance",
          nextScene: "not_so_badCall_thirstQuenched",
          requiredItem: (currentItem) => currentItem.fullCanteen,
          setItem: {fullCanteen: false, emptyCanteen: true},
          healthPoints: +10,

        }

    ],
  },

  {
    id: "not_so_badCall_thirstQuenched",
    text: "You chug deeply from your canteen. You feel much beter. Once your finished, you advance forward. You're almost to the womans body when the worst happens: You step on something squeaky. A chew toy. The squeak echoes throughtout the entire forest it seems like. You freeze in your tracks. This isn't good. The two men turn around and raise their rifles and briskly advance back towards the clearing. \"FREEZE,\" they shout. ",
    url: "./img/hazmat_introduction.jpg",
    options: [
      {
          text: "Surrender",
          nextScene: "surrender_scene",
      },

      {
        text: "Slowly back away(run).",
        nextScene: "live_to_fight_anotherday",
      },

      {
        text: "Momma didn't raise a coward (fight them)",
        nextScene: "mortal_kombat"
      }
  ],
  },

//The of calling out to them below
  {
    id: "a_bad_call",
    text: "You need to find a way out of this forest. You yell out to them. They both look in your direction. Just looking. As you walk closer to them you realize they are wearing hazmat suits with handguns holstered on their hips and rifles pointed. At you. The person lying down appears to be a woman in tattered clothes. \"Freeze!!!!,\" they shout. You have a bad feeling about this.",
    url: "./img/maskedCombat.jpg",
    options: [
        {
            text: "Surrender",
            nextScene: "surrender_scene",
        },

        {
          text: "Slowly back away(run).",
          nextScene: "live_to_fight_anotherday",
        },

        {
          text: "Momma didn't raise a coward (fight them)",
          nextScene: "mortal_kombat"
        }
    ],
  },

  {
    id: "mortal_kombat",
    text: "You make an about face and sprint away as fast as you can...But you aren't really running, you're creating some distance. Shots whiz by you, narrowly missing you. You're running on pure adrenaline at this point. You find a dense part of the forest and hide behind a tree. You wait. As you hear their footsteps closing in you get ready to act. You'r timing will have to be perfect...",
    url: "./img/maskCombat3.jpg",
    options: [
        {
            text: "Next",
            nextScene: "mortal_kombat_2",
            healthPoints: -30,
        },
    ],
  },

  {
    id: "mortal_kombat_2",
    text: "You see the first guy whiz past you and then a split second later you see the other guy coming up, you hold your foot out to trip them. You can't believe it works!! Before he has a chance to get up you grab his rifle and hit him with the rifle butt, knocking him out. The other soldier is a few yards away still running forward looking for you...",
    url: "./img/maskCombat3.jpg",
    options: [
        {
            text: "Aim for the legs",
            nextScene: "kombat_nonlethal",
        },

        {
          text: "Killshot",
          sanityPoints: -20,
          nextScene: "kombat_lethal",
      },
    ],
  },

  {
    id: "kombat_nonlethal",
    text: "You shoot the running assailaint in his foot while he's running. He howls in pain. You swiftly close the distance and hit him in the head with the rifle butt. He's out cold.EZ-Peezy, nobody has to die.You decide to check the bodies to see if you can find any clues as to how you got here.",
    url: "./img/forestFP.jpg",
    options: [
        {
            text: "Next",
            nextScene: "body_search",
        },
    ],
  },

  {
    id: "kombat_lethal",
    text: "That wasn't a very sane thing to do.. You feel as though there is a price to be paid for taking a life. Oh well. It couldn't be helped. You decide to check the bodies to see if you can find any clues as to how you got here.",
    url: "./img/forestFP.jpg",
    options: [
        {
            text: "Next",
            nextScene: "body_search",
        },

    ],
  },

  {
    id: "body_search",
    text: "You search the bodies, starting by ripping off their hazmat getups. You search their pockets. Their wallets have their ID cards, but their names don't ring a bell. They don't look familiar either. Eventually you find a folded up piece of paper. It has a picture of someone on the sheet. A picture of you. Alot of the text is blacked out for some reason.  \"The target is highly contaigous. Approach with caution.\"......What..?",
    url: "./img/body_search.jpg",
    options: [
        {
            text: "Conclusion",
            nextScene: "body_search_2",
        },

    ],
  },
  

  

  {
    id: "surrender_scene",
    text: "You put your hands up. Maybe they can help you get out of here. They slowly advance towards you, rifles still pointed.",
    url: "",
    options: [
        {
            text: "Next",
            nextScene: "surrender_scene_cont",
        },

    ],
  },

  {
    id: "live_to_fight_anotherday",
    text: "You about face and decide to nope on out of there. The open fire immediately. Bullest whiz by but the dense trees keep you fairly well protected. \"THE SUBJECT IS TRYING TO ESCAPE!!\".....subject? You sense of panic increases two fold. A stray bullet grazes your side and floors you. You feel like it cracked a rib.  ",
    url: "./img/gunfire_death.jpg",
    options: [
        {
            text: "Next",
            nextScene: "run_path",
            healthPoints: -20,
            playerSanity: -5,
        },
    ],
  },

  {
    id: "run_path",
    text: "You're wounded and winded, so running is out of the question at the moment. It's best to just find somewhere to hide. While still on the ground you roll to the side out of site and find some bushes to hide in. Your attackers quickly make it to where you were last seen. \"I see blood. He can't have gone far. Lets finish the job,\" you hear one of them say. Why are they in hazmats? Is there poison in these woods? You create some more distance while staying low and find a nearby tree to climb to get a higher vantage point",
    url: "./img/gunfire_death.jpg",
    options: [
        {
            text: "....Is that a beehive?",
            requiredItem: (currentItem) => currentItem.slingShot,
            nextScene: "bee_path",
            
        },

        {
          text: "Use rocks",
          requiredItem: (currentItem) => currentItem.bundleOfRocks,
          nextScene: "rock_path",
        },

        {
          text: "Observe",
          nextScene: "observe_path",
          
      },
    ],
  },

  {
    id: "rock_path",
    text: "You take a nice sized rock and wind up your throw. You toss a rock as hard as you can at them. You hit one in the shoulder and he turns around and opens fire on you.",
    url: "/img/rock_throw.jpg",
    options: [
        {
            text: "Oh sh-",
            healthPoints: -100,
            nextScene: "observe_path_cont_4",
        },
    ],
  },

  {
    id: "bee_path",
    text: "You see a beehive in a nearby tree. This is great! You pull out your slingshot and you lovingly made and wait for your chance. When they are right below it you let it rip. The bee hive falls at their feet and the bees go ballistic. Even though they are wearing suits it still startles them and they run away from the bees. You in the chaos you sneak bee-hind them and put one in a chokehold, holding him hostage. Your craftiness makes you feel like a boss.  \"Ok. now you are going to answer my questions,\" you say.",
    url: "",
    options: [
        {
            text: "Yikes",
            sanityPoints: +10,
            nextScene: "observe_path_cont_2",
        },
    ],
  },

  {
    id: "observe_path",
    text: "Your pursuers look everywhere, but for some reason don't think to look up. After what feels like forever, they start walking away from your location. Nows your chance!!!",
    url: "",
    options: [
        {
            text: "Sneak behind them",
            nextScene: "observe_path_cont",
        },
    ],
  },

  {
    id: "observe_path_cont",
    text: "Using stealth that you've honed from years of video games, you get behind them. The ware walking in a single file formation. This is perfect. You quickly grab the guy in the back from behind putting them in a chokhold and take the handgun on his hip and point it at his head. You feel like a badass. The commotion alerts the guy in front, but he's too late. \"Ok. now you are going to answer my questions,\" you say.",
    url: "./img/observe_pitou.jpg",
    options: [
        {
            text: "Next",
            nextScene: "observe_path_cont_2",
        },
    ],
  },


  {
    id: "observe_path_cont_2",
    text: "Realizing he's been outplayed, the other assailant slowly puts his rifle on the ground and puts his hands up. \"You're going to tell me who you guys are and why you're following me right now or you're both dead,\" you threaten. There's silence for while, then finally the man speaks: \"You know, all you had to do was comply. This outbreak is all your fault, you know.\"....Outbreak?",
    url: "./img/observe_pitou.jpg",
    options: [
        {
            text: "Lets finish this",
            nextScene: "blahblah",
        },
    ],
  },

  

  








  


  


  // END OF GAME SCENES


  {
    id: "gameoverScene",
    text: "What a horrible night to have a curse....", //This is the text that displays on the screen
    url: "./img/Dark_Souls_You_Died_Screen_-_Completely_Black_Screen_0-2_screenshot.jpg",
    options: [
      {
        text: "Start Over",
      },
    ],
  },

  

  {
    id: "I_wanna_go_home",
    text: "You decide to press on. You won't allow yourself to be discouraged by a dumb rock. You huff and puff for a second and decide to pick a different direction and start stomping loundly. As you walk, you keep your brow furrowed and eyes locked to the ground as you slowly rub your sore noggin. You finally decide to look ahead and see that you've somehow stumbled upon the same clearing with the bear and the berries. And the bear is still there, eyes fixated on you. And he's ready for dessert.",
    url: "./img/phone_revelation.jpg",
    options: [
        {
            text: "Oh sh-",
            nextScene: "nope_conclusion",
            healthPoints: -100,

        },

    ],
  },

  {
    id: "beardeath",
    text: "The bear stops gorging itself on berries as soon as you try to advance a few inches forward. The bear comes at you with speed and precision the likes of which has never been recorded. You are defenseless. The bear makes short work of you.",
    url: "./img/bear_rage.jpg",
    options: [
        {
          text: "Start Over",
        },
      ],
  },


  {
    id: "surrender_scene_cont",
    text: ".....and they open fire. It all happens so fast that you don't have much time to react.",
    url: "",
    options: [
        {
            text: "Yikes",
            healthPoints: -100,
            nextScene: "surrender_scene_over",
        },
    ],
  },

  //Good ending run path
  {
    id: "Good_end",
    text: "Your head hurts even more as you struggle to remember how you got here. You push the guard you're holding into the other guard and make a break for it. You're starting to remember how you got here. It's all starting to come back to you, slowly but surely. You caused an outbreak. People died. Alot of them. You aren't sure about the who's or hows at the moment, but you know the key to stopping everything is at your house, back in the city. And you think you know how to get there. There isn't much time left....",
    url: "./img/flower_of_hope.jpg",
    options: [
        {
            text: "Finish",
            nextScene: "toBeContinued",
        },
    ],
  },

  //Bad ending run path

  {
    id: "Dark_end",
    text: "You let out a howl and shoot the person your'e holding and then proceed to shoot the other guy too. You start to remember how you got here. You caused an outbreak, but you didn't ask for any of this. You remember the forest that lies right on the outskirts of town. You'll make them all pay. Fueled by rage, you make your way to town.",
    url: "./img/abyss_ending.png",
    options: [
        {
            text: "Finish",
            nextScene: "toBeContinued",
        },
    ],
  },
  
//Good ending fight path
{
  id: "The_truth ",
  text: "Slowly, you start to remember how you got here. In this forest. You remember being captured. You remember escaping. There are still some blurry bits, but one thing is certain. There was some kind of outbreak, and you're being blamed for it. It's going to take some time to regain all of your memories, but you feel as though the key to saving everyone is back at your house in the city. You just have to make it there. Lets put a stop to this....",
  url: "./img/virus.jpg",
  options: [
      {
          text: "Finish",
          nextScene: "toBeContinued",
      },
  ],
},

//Bad ending fight path

{
  id: "The_dark ",
  text: "Slowly, you start to remember how you got here. In this forest. You remember being captured. You remember escaping. There are still some blurry bits, but one thing is certain. There was some kind of outbreak, and you're being blamed for it. How dare they?! You know that the life you used to live is dead now. Only rage remains. You vow to put a stop to this once and for all. You remember how to get to your house in the nearby city. You make your way there, vowing to kill everyone in your path.",
  url: "./img/abyss_ending.png",
  options: [
      {
          text: "Finish",
          nextScene: "toBeContinued",
      },
  ],
},


  {
    id: "toBeContinued",
    text: "Thanks for playing!!!",
    url: "./img/to_be_continued.jpg",
    options: [
        {
          text: "Start Over"
        },
    ],
  },

  {
    id: "scene3",
    text: "You have found a strange monolith. What do you do with it? ", //This is the text that displays on the screen
    options: [
      {
        text: "touch monolith",
        nextScene: "?????????",
      },
      {
        text: "Become one with the void",
        nextScene: "gameoverScene",
      },
    ],
  },
];

gameStart();
