(() => {
  // src/scripts/utility.ts
  function hideIfEmpty($element) {
    if ($element.text() === "" && !cardview_isEditing())
      $element.hide();
    else
      $element.show();
  }
  function mapColor(cssRgbString, f) {
    const pattern = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
    const result = cssRgbString.match(pattern);
    const r = parseInt(result[1]);
    const g = parseInt(result[2]);
    const b = parseInt(result[3]);
    let [r2, g2, b2] = f(r, g, b);
    r2 = Math.max(0, Math.min(Math.floor(r2), 255));
    g2 = Math.max(0, Math.min(Math.floor(g2), 255));
    b2 = Math.max(0, Math.min(Math.floor(b2), 255));
    return `rgb(${r2}, ${g2}, ${b2})`;
  }
  function moveCursorToEnd() {
    document.execCommand("selectAll", false, null);
    document.getSelection().collapseToEnd();
  }
  function cleanContent(html) {
    return html.replace("<div><br></div>>", "<br>").replaceAll("<div>", "<br>").replaceAll("</div>", "");
  }

  // src/scripts/data.ts
  var sourceLabels = [
    {
      "id": 1,
      "name": "Control of Vehicle",
      "color": "#52A5FF"
    },
    {
      "id": 2,
      "name": "Legal Matters/Rules of the Road",
      "color": "#858585"
    },
    {
      "id": 3,
      "name": "Managing Risk",
      "color": "#FFC64D"
    },
    {
      "id": 4,
      "name": "Safe and Responsible Driving",
      "color": "#FF5757"
    },
    {
      "id": 5,
      "name": "Technical Matters",
      "color": "#CC80FF"
    }
  ];
  var sourceCards = [
    {
      "id": 1,
      "content": "What is the effect of an incorrectly adjusted driver's seat?",
      "labels": [1],
      "options": [
        "It can delay the driver from operating a control.",
        "It improves the driver's ability to operate the clutch.",
        "It enables the driver to relax more on a long journey.",
        "It gives the driver a better view in the rear-view mirror."
      ],
      "correct": 1,
      "completion": "incorrect",
      "difficulty": 3,
      "answerContent": "Before starting a journey, you should adopt a suitable and comfortable driving position by adjusting the drivers seat to a position where all the vehicle controls can be operated efficiently."
    },
    {
      "id": 2,
      "content": "What type of noise might fast cornering create?",
      "labels": [1],
      "options": [
        "Brake squeal.",
        "Tyre squeal.",
        "Exhaust backfire.",
        "Engine backfire."
      ],
      "correct": 2,
      "answerContent": "If you drive around a corner too fast, the tyres begin to lose contact with the surface of the road, and this causes a squealing sound. If you continue driving in this way, you can lose control of the vehicle."
    },
    {
      "id": 3,
      "content": "What is a likely consequence of sudden braking?",
      "labels": [1],
      "options": [
        "There will be no consequences as the vehicle's brake lights will come on.",
        "The vehicle could be hit from behind.",
        "The vehicle's braking system could overheat.",
        "The vehicle could be overtaken."
      ],
      "correct": 2,
      "answerContent": "As well as reading the road ahead, you should also be aware of traffic travelling behind you. This will help you react correctly in a situation where you need to brake suddenly."
    },
    {
      "id": 4,
      "content": "If the brake pedal of a vehicle feels soft or spongy when applied, what does this mean?",
      "labels": [1],
      "options": [
        "A fault in the brake fluid system.",
        "Worn brake pads.",
        "A fault in the hand-brake cable.",
        "The parking brake is on."
      ],
      "correct": 1,
      "answerContent": "If the brake pedal feels soft or spongy when pressed, it could indicate that the brake fluid level is low and there is a fault in the system. Each time a driver sets out on a journey, they should test the brakes. If a fault is detected, have it checked by a competent person. Drivers should check brake fluid levels regularly."
    },
    {
      "id": 5,
      "content": "Whilst driving, why might a driver suspect that the brake fluid level in their vehicle is low?",
      "labels": [1],
      "options": [
        "The brakes feel hard to press.",
        "The brakes feel spongy and soft.",
        "The brakes are unusually sharp.",
        "The brakes take longer than usual to release."
      ],
      "correct": 2,
      "answerContent": "If the brake pedal feels soft or spongy when pressed, it could indicate that the brake fluid level is low and there is a fault in the system. Each time a driver sets out on a journey, they should test the brakes. If a fault is detected, have it checked by a competent person. Drivers should check brake fluid levels regularly."
    },
    {
      "id": 6,
      "content": "If a driver applies the foot brake and hears a scraping noise, what is the most likely cause?",
      "labels": [1],
      "options": [
        "The brake linings or pads are worn.",
        "One of the front tyres is flat.",
        "The brake-pads are wet.",
        "One of the rear tyres is flat."
      ],
      "correct": 1,
      "answerContent": "Drivers should test their brakes regularly and particularly before setting out on a journey. However, if when driving they hear a scraping noise when they press the brake, the most likely reason is that the brake linings or pads are worn. In this case, brakes wont work as well as they should and the driver should have them replaced by a competent person immediately."
    },
    {
      "id": 7,
      "content": "What may indicate a problem with the vehicle's braking system?",
      "labels": [1],
      "options": [
        "The vehicle's parking brake is more effective.",
        "The vehicle's suspension is affected.",
        "The vehicle's fuel consumption is reduced.",
        "The vehicle's stopping ability is affected."
      ],
      "correct": 4,
      "answerContent": "Drivers should test their brakes before setting out on a journey. If when driving they notice that it is taking longer than usual to bring the vehicle to a stop, they should have the brakes checked immediately by a competent person."
    },
    {
      "id": 8,
      "content": "What can cause a vehicle to skid?",
      "labels": [1],
      "options": [
        "Controlled acceleration.",
        "Coasting to a stop.",
        "Excessive heavy braking.",
        "Stopping in fourth gear."
      ],
      "correct": 3,
      "answerContent": "Heavy braking can cause a vehicle to skid, particularly if the road surface is wet or uneven, or if the tyres are worn or incorrectly inflated. Read the road well ahead and try to avoid heavy braking, particularly in wet or slippery conditions."
    },
    {
      "id": 9,
      "content": "Why should a tractor be driven more slowly on uneven road surfaces?",
      "labels": [1],
      "options": [
        "To avoid severe bouncing.",
        "To avoid fuel spilling from the tank.",
        "To reduce road noise.",
        "To maintain tyre pressure."
      ],
      "correct": 1,
      "answerContent": "Drivers should drive more slowly on an uneven road surface because driving a tractor at speed could cause the vehicle or the trailer to become unstable and difficult to control. During severe bouncing the tractor's wheels can lose contact with the road, negatively affecting steering and braking."
    },
    {
      "id": 10,
      "content": "When should the handbrake be used to bring a vehicle to a halt?",
      "labels": [1],
      "options": [
        "Only when going uphill.",
        "At any time.",
        "Normally never.",
        "Only when going downhill."
      ],
      "correct": 3,
      "answerContent": "In general the handbrake should never be used to bring a vehicle to a halt. This practice is potentially dangerous, as the rear wheels could lock up and the vehicle could skid out of control. In addition, using the handbrake does not operate the rear brake lights to warn following traffic."
    },
    {
      "id": 11,
      "content": "What is the danger associated with applying the handbrake (parking brake) when the vehicle is moving?",
      "labels": [1],
      "options": [
        "There is no danger - the vehicle will not skid as the handbrake can be released quickly.",
        "The engine will stall once the handbrake is applied at speed.",
        "The wheels could lock and cause the vehicle to skid.",
        "The ABS could disconnect and cause the vehicle to skid."
      ],
      "correct": 3,
      "answerContent": "Except in an emergency, the handbrake (parking brake) should never be used when the vehicle is moving. This practice is potentially dangerous, as the wheels could lock up and the vehicle could skid out of control. In addition there is no warning to following traffic from the brake lights."
    },
    {
      "id": 12,
      "content": "The parking brake (hand brake) generally works on which wheels?",
      "labels": [1],
      "options": [
        "The rear wheels.",
        "The rear right-hand wheel.",
        "All the wheels.",
        "The front wheels."
      ],
      "correct": 1,
      "answerContent": "In most vehicles, the parking brake operates on the rear wheels only. The function of the parking brake (handbrake) is to stop the vehicle from moving when it is parked or when it is stopped on a hill. Drivers normally use the parking brake when the vehicle is already stationary and should generally not use it to stop the vehicle. It is even more important to use the parking brake when parked on a hill or when stationary in a vehicle with automatic transmission to prevent creep."
    },
    {
      "id": 13,
      "content": "What is the recommended method of driving a car with automatic transmission?",
      "labels": [1],
      "options": [
        "Operate the accelerator and brake with the right foot.",
        "Operate the accelerator with the right foot and the brake with the left foot.",
        "Operate the accelerator and brake with the left foot.",
        "Use the handbrake to bring the vehicle to a halt."
      ],
      "correct": 1,
      "answerContent": "When driving a car with automatic transmission, drivers should use the right foot to operate both the accelerator and the brake, just as in vehicles with a manual gear box. In general it is important to avoid using the accelerator and the brake at the same time."
    },
    {
      "id": 14,
      "content": "How should an L-plate be composed?",
      "labels": [2],
      "options": [
        "A red L on a white background.",
        "A white L on a red background.",
        "A red L on a transparent background.",
        "A green L on a white background."
      ],
      "correct": 1,
      "answerContent": "L-plates should be displayed front and rear. The plates should be a red L on a white background and should be not less than 15\xA0cm high with a border of at least 2\xA0cm. A learner motorcyclist must wear a yellow tabard displaying L-plates front and rear. The L-plates must be not less than 15\xA0cm high on a white background."
    },
    {
      "id": 15,
      "content": "Which vehicle is exempt from speed limits when being used in an emergency?",
      "labels": [2],
      "options": [
        "Fire brigade.",
        "Mountain rescue.",
        "Doctor on call.",
        "Breakdown recovery."
      ],
      "correct": 1,
      "answerContent": "In the course of their duty Garda\xED, Fire Brigade and ambulance personnel are exempt from some traffic laws including speed limits, as long as they do not put other road users in danger. If you hear or see a Garda or emergency vehicle approaching under emergency conditions, be extra careful and give way, if it is safe to do so."
    },
    {
      "id": 16,
      "content": "Which vehicle is exempt from speed limits when being used in an emergency?",
      "labels": [2],
      "options": [
        "Ambulance.",
        "Breakdown recovery.",
        "Doctor on call.",
        "Mountain rescue."
      ],
      "correct": 1,
      "answerContent": "In the course of their duty Garda\xED, Fire Brigade and ambulance personnel are exempt from some traffic laws including speed limits, as long as they do not put other road users in danger. If you hear or see a Garda or emergency vehicle approaching under emergency conditions, be extra careful and give way, if it is safe to do so."
    },
    {
      "id": 17,
      "content": "Which vehicle is exempt from speed limits when being used in an emergency?",
      "labels": [2],
      "options": [
        "Doctor on call.",
        "Breakdown recovery.",
        "Mountain rescue.",
        "Garda."
      ],
      "correct": 4,
      "answerContent": "In the course of their duty Garda\xED, Fire Brigade and ambulance personnel are exempt from some traffic laws including speed limits, as long as they do not put other road users in danger. If you hear or see a Garda or emergency vehicle approaching under emergency conditions, be extra careful and give way, if it is safe to do so."
    },
    {
      "id": 18,
      "content": "Where should L-plates be displayed on cars?",
      "labels": [2],
      "options": [
        "On the front only.",
        "Both front and rear.",
        "On the driver's side only.",
        "On the rear only."
      ],
      "correct": 2,
      "answerContent": "The holder of a learner permit must display L-plates on the front and rear of their car at all times when driving on public roads."
    },
    {
      "id": 19,
      "content": "What is the maximum gross weight of a vehicle that may be driven by the holder of a Category B driving licence?",
      "labels": [2],
      "options": [
        "3,250 kilograms",
        "3,500 kilograms",
        "3,000 kilograms",
        "3,450 kilograms"
      ],
      "correct": 2,
      "answerContent": "The holder of a Category B driving licence is not permitted to drive a vehicle with a design gross vehicle weight of more than 3,500\xA0kg. This restriction is noted on the licence."
    },
    {
      "id": 20,
      "content": "When should children be allowed to drive a tractor?",
      "labels": [2],
      "options": [
        "Children should never be allowed to drive a tractor.",
        "When it is being driven at very slow speeds and without a front loader.",
        "When it is being driven at very slow speeds and not towing a trailer.",
        "When accompanied by a fully licensed driver."
      ],
      "correct": 1,
      "answerContent": "Persons under 16\xA0years of age are not permitted to drive a tractor in a public place."
    },
    {
      "id": 21,
      "content": "What is the maximum permissible speed for cars and motorcycles on motorways?",
      "labels": [2],
      "options": [
        "120\xA0km/h.",
        "80\xA0km/h.",
        "100\xA0km/h.",
        "60\xA0km/h."
      ],
      "correct": 1,
      "answerContent": "It is illegal to exceed 120\xA0km/h when driving on a motorway."
    },
    {
      "id": 22,
      "content": "Unless otherwise indicated, what is the maximum permissible speed for cars or motorcycles on national roads?",
      "labels": [2],
      "options": [
        "60\xA0km/h.",
        "80\xA0km/h.",
        "100\xA0km/h.",
        "120\xA0km/h."
      ],
      "correct": 3,
      "answerContent": "It is illegal to exceed 100\xA0km/h when driving on a single carriageway national road."
    },
    {
      "id": 23,
      "content": "Unless otherwise indicated, what is the maximum permissible speed of a car towing a caravan on national roads?",
      "labels": [2],
      "options": [
        "60\xA0km/h.",
        "80\xA0km/h.",
        "120\xA0km/h.",
        "100\xA0km/h."
      ],
      "correct": 2,
      "answerContent": "When towing a caravan on a national road, it is illegal to exceed 80\xA0km/h ? excessive speed will make such a vehicle unstable."
    },
    {
      "id": 24,
      "content": "Unless otherwise indicated, what is the maximum permissible speed of a car towing a caravan on a motorway?",
      "labels": [2],
      "options": [
        "100\xA0km/h.",
        "80\xA0km/h.",
        "120\xA0km/h.",
        "90\xA0km/h."
      ],
      "correct": 2,
      "answerContent": "When towing a caravan on a motorway it is illegal to exceed 80\xA0km/h ? excessive speed will make such a vehicle unstable."
    },
    {
      "id": 25,
      "content": "Unless otherwise indicated, what is the maximum permissible speed of a car towing a trailer on national roads?",
      "labels": [2],
      "options": [
        "120\xA0km/h.",
        "60\xA0km/h.",
        "80\xA0km/h.",
        "100\xA0km/h."
      ],
      "correct": 3,
      "answerContent": "When towing a trailer on a national road, it is illegal to exceed 80\xA0km/h ? exceeding this speed will make the vehicle unstable."
    },
    {
      "id": 26,
      "content": "Unless otherwise indicated, what is the maximum permissible speed of a car towing a trailer on a motorway?",
      "labels": [2],
      "options": [
        "60\xA0km/h.",
        "120\xA0km/h.",
        "80\xA0km/h.",
        "100\xA0km/h."
      ],
      "correct": 3,
      "answerContent": "When towing a trailer on a motorway it is illegal to exceed 80\xA0km/h ? excessive speed will make such a vehicle unstable."
    },
    {
      "id": 27,
      "content": "Where is a driver allowed to park?",
      "labels": [2],
      "options": [
        "Where there is a continuous white line along the centre of the road.",
        "On a footpath.",
        "At road works.",
        "Where the driver is not blocking other road users their view of traffic signals or the road ahead."
      ],
      "correct": 4,
      "answerContent": "It is an offence to park at the side of a road that has a single or double continuous white line along its centre. Parking on such a road could create an obstruction and may cause inconvenience or danger to other road users."
    },
    {
      "id": 28,
      "content": "What distance before a zebra crossing is parking prohibited?",
      "labels": [2],
      "options": [
        "5\xA0metres.",
        "20\xA0metres.",
        "10\xA0metres.",
        "15\xA0metres."
      ],
      "correct": 4,
      "answerContent": "It is an offence to park 15\xA0metres before or 5\xA0metres after a pedestrian crossing. Parking in this manner may restrict the zone of vision of drivers approaching the crossing and endanger pedestrians."
    },
    {
      "id": 29,
      "content": "Within what distance of a road junction is parking prohibited?",
      "labels": [2],
      "options": [
        "15\xA0metres, unless parking spaces are clearly marked.",
        "20\xA0metres, unless parking spaces are clearly marked.",
        "5\xA0metres, unless parking spaces are clearly marked.",
        "10\xA0metres, unless parking spaces are clearly marked."
      ],
      "correct": 3,
      "answerContent": "It is an offence to park within 5\xA0metres of a road junction unless parking spaces are clearly marked. Parking in that area may restrict the zone of vision of drivers approaching the junction and may cause an obstruction to large vehicles wishing to turn."
    },
    {
      "id": 30,
      "content": "Is a driver permitted to park at an entrance to a property?",
      "labels": [2],
      "options": [
        "Yes, for 1\xA0hour between 23.30\xA0hrs to 07.00\xA0hrs.",
        "Yes, for 1\xA0hour between 07.00\xA0hrs to 23.30\xA0hrs.",
        "Yes, with the property owner's consent.",
        "Yes, outside business hours."
      ],
      "correct": 3,
      "answerContent": "You may park across the entrance to a property only with the owners consent. Parking across an entrance may cause inconvenience and danger to persons entering or leaving the property."
    },
    {
      "id": 31,
      "content": "When is parking permitted on a footpath?",
      "labels": [2],
      "options": [
        "When no more than half of the vehicle is on the footpath.",
        "When cars are parked on both sides of the road.",
        "It is never permitted to park on a footpath.",
        "When at least half of the footpath remains free for pedestrians."
      ],
      "correct": 3,
      "answerContent": "It is an offence to park on a footpath. Where a vehicle is parked on a footpath, pedestrians may have to step onto the road to go around the vehicle and so place themselves in danger."
    },
    {
      "id": 32,
      "content": "When is double parking permitted?",
      "labels": [2],
      "options": [
        "When there are double yellow lines.",
        "When there are double white lines.",
        "It is never permitted.",
        "When there is a hard shoulder."
      ],
      "correct": 3,
      "answerContent": "Double parking is never permitted. Parking is never permitted where it might interfere in any way with the normal flow of traffic or obstruct or endanger other road users."
    },
    {
      "id": 33,
      "content": "When is parking permitted at a taxi rank?",
      "labels": [2],
      "options": [
        "When waiting to collect passengers from a taxi.",
        "Parking at a taxi rank is prohibited unless driving a taxi.",
        "When parking for less than 15\xA0minutes.",
        "When the rank is unoccupied."
      ],
      "correct": 2,
      "answerContent": "Stopping or parking within an area marked as a taxi rank is prohibited as this may obstruct taxis entering or leaving the rank."
    },
    {
      "id": 34,
      "content": "When is parking permitted at a sharp bend?",
      "labels": [2],
      "options": [
        "When drivers coming from behind can see the parked vehicle.",
        "When the hazard warning lights of the parked vehicle are on.",
        "Parking is never permitted at a sharp bend.",
        "When parking no more than 45\xA0centimetres from the kerb or edge of the road."
      ],
      "correct": 3,
      "answerContent": "Parking is never permitted where it might interfere in any way with the normal flow of traffic or obstruct or endanger other road users ? for example, by forcing other drivers into the path of oncoming traffic."
    },
    {
      "id": 35,
      "content": "When is parking permitted on the brow of a hill?",
      "labels": [2],
      "options": [
        "Parking is never permitted on the brow of a hill.",
        "Parking is permitted when a vehicle has an efficient handbrake.",
        "Only when there is no traffic on the road.",
        "When the driver angles the wheels towards the kerb."
      ],
      "correct": 1,
      "answerContent": "Parking on the brow of a hill or on a humpbacked bridge is prohibited. Parking in such a place may restrict the zone of vision of drivers approaching the hill and force them into the path of oncoming traffic."
    },
    {
      "id": 36,
      "content": "What is the purpose of traffic calming measures?",
      "labels": [2],
      "options": [
        "To slow down traffic in the vicinity.",
        "To prioritise heavy goods traffic.",
        "To alert drivers to road flooding ahead.",
        "To inform the driver of an increased speed limit ahead."
      ],
      "correct": 1,
      "answerContent": "The purpose of traffic calming measures is to slow down fast-moving traffic to a speed more suitable for the area they are entering. These measures are usually found in rural areas on the entry points to towns or villages."
    },
    {
      "id": 37,
      "content": "When may a trailer be towed on a public road without a rear number plate?",
      "labels": [2],
      "options": [
        "When being towed by an agricultural tractor.",
        "When the tailboard is removed.",
        "When carrying a load that overhangs the trailer.",
        "Never, a number plate must always be displayed."
      ],
      "correct": 4,
      "answerContent": "The law requires all motorised vehicles to display a rear number plate that is clean and legible."
    },
    {
      "id": 38,
      "content": "What traffic may use a cycle lane accompanied by a continuous white line?",
      "labels": [2],
      "options": [
        "Cyclists and motorised wheelchairs.",
        "Cyclists and motorcyclists.",
        "Buses and cyclists.",
        "Cyclists and taxis."
      ],
      "correct": 1,
      "answerContent": "A cycle track is for the use of cyclists and motorised wheelchairs. No other vehicles may cross into or over a mandatory cycle track unless this is necessary in order to leave a side road or a property adjacent to the cycle track."
    },
    {
      "id": 39,
      "content": "Apart from cyclists and motorised wheelchairs, what other road users may use an unoccupied cycle lane accompanied by a broken white line?",
      "labels": [2],
      "options": [
        "Only buses and taxis.",
        "All drivers may make temporary use.",
        "Only hackneys and taxis.",
        "Only moped riders and motorcyclists."
      ],
      "correct": 2,
      "answerContent": "Drivers may make temporary use of a cycle track with a broken white line on the right hand side if it is not occupied."
    },
    {
      "id": 40,
      "content": "When must drivers stop at an automated railway level crossing with barriers and red flashing lights?",
      "labels": [2],
      "options": [
        "Stop safely when the amber light shows, or when red lights start to flash.",
        "When the barrier is fully up.",
        "When the red and amber lights stop flashing.",
        "When there are no lights visible."
      ],
      "correct": 1,
      "answerContent": "You must stop safely when the amber light shows. Flashing red lights have the same meaning as a steady red traffic light - stop safely when they show."
    },
    {
      "id": 41,
      "content": "At a railway level crossing with unattended gates, what should a car driver do?",
      "labels": [2],
      "options": [
        "Drive half way across and close the first gate before opening the second.",
        "Open both gates and after passing the first, stop and close it.",
        "Telephone the nearest railway station before opening a gate.",
        "Open both gates before proceeding to cross."
      ],
      "correct": 4,
      "answerContent": "At a level crossing with unattended gates a driver must stop, look for trains and listen for the sound of a horn or approaching trains. If it is safe, open both gates, complete the crossing and then close both gates."
    },
    {
      "id": 42,
      "content": "What do flashing amber arrows indicate at a junction?",
      "labels": [2],
      "options": [
        "The direction indicated is a cul-de-sac.",
        "It is prohibited to proceed in the direction indicated.",
        "Proceed smartly through junction to avoid delay.",
        "When safe, drivers should proceed in the direction indicated."
      ],
      "correct": 4,
      "answerContent": "When you meet a flashing amber arrow at a junction, you should proceed in the direction indicated provided it is safe to do so."
    },
    {
      "id": 43,
      "content": "When do temporary speed limits apply at roadworks?",
      "labels": [2],
      "options": [
        "Only when road workers are on site.",
        "During business hours only.",
        "For the duration of the roadworks.",
        "Only when there is oncoming traffic."
      ],
      "correct": 3,
      "answerContent": "Temporary speed limits at road works apply for the duration of the works. When road works are completed, normal speed limits apply."
    },
    {
      "id": 44,
      "content": "When wanting to stop temporarily in a congested area where should the driver park?",
      "labels": [2],
      "options": [
        "Park in a safe, legal and convenient place.",
        "Park on the footpath so as not to impede the free flow of traffic in the road.",
        "Double park in a convenient place with your hazard lights on.",
        "Park slightly up on the footpath with the hazard lights on."
      ],
      "correct": 1,
      "answerContent": "You should park only where it is safe, legal and convenient to do so. Your parked vehicle must not cause a danger or an obstruction to other road users. The use of hazard warning lights does not excuse unsafe or illegal parking."
    },
    {
      "id": 45,
      "content": "What is a clearway?",
      "labels": [2],
      "options": [
        "An area that is strictly reserved for the loading and unloading of HGVs.",
        "An area that is reserved for pedestrians and motorised wheelchairs.",
        "An area where stopping and parking is not permitted during certain times.",
        "An area where stopping and parking is reserved for buses and taxis only."
      ],
      "correct": 3,
      "answerContent": "A clearway is an area of road that must be kept clear for moving traffic during certain times of the day ( usually busy periods). The times when stopping or parking is prohibited are shown on an information plate under the sign."
    },
    {
      "id": 46,
      "content": "What restriction applies to a driver's full licence if they have passed their test on a vehicle with automatic transmission?",
      "labels": [2],
      "options": [
        "They may not drive vehicles with manual transmission.",
        "They may not drive on motorways.",
        "They must continue to display L-plates.",
        "They may not drive at speeds of more that 80\xA0km/h."
      ],
      "correct": 1,
      "answerContent": "If you pass your driving test in a vehicle fitted with automatic transmission, a code 78 will be noted on the full licence in the restrictions/information column."
    },
    {
      "id": 47,
      "content": "What roads are learner permit holders allowed to drive on?",
      "labels": [2],
      "options": [
        "All roads except motorways and dual-carriageways.",
        "All roads except dual-carriageways.",
        "All roads except national roads.",
        "All roads except motorways."
      ],
      "correct": 4,
      "answerContent": "A learner permit holder must not drive on a motorway. It is a serious offence to do so."
    },
    {
      "id": 48,
      "content": "Which roads are learner permit holders not allowed to drive on?",
      "labels": [2],
      "options": [
        "They may not drive on motorways.",
        "They may not drive on dual carriageways.",
        "They may not drive on rural roads.",
        "They may not drive on national roads."
      ],
      "correct": 1,
      "answerContent": "A learner permit holder must not drive on a motorway. It is a serious offence to do so."
    },
    {
      "id": 49,
      "content": "Is it permitted to use a vehicle in a public place without a current tax disc displayed?",
      "labels": [2],
      "options": [
        "Yes, but for not more than 10\xA0days after the expiry of the previous disc.",
        "No, only vintage vehicles are exempt from displaying a tax disc.",
        "Yes, but for not more than one month after the expiry of the previous disc.",
        "No, all motor vehicles must display a current tax disc."
      ],
      "correct": 4,
      "answerContent": "A motor vehicle must be taxed and must display the up-to-date tax disk before it may be taken on the road."
    },
    {
      "id": 50,
      "content": "If a driver wishes to drive a vehicle but the tax disc is expired, what should they do?",
      "labels": [2],
      "options": [
        "They should drive it only in case of an emergency.",
        "They should tax it immediately.",
        "They should renew it within 10\xA0days of expiry.",
        "They should contact the Garda\xED for approval."
      ],
      "correct": 2,
      "answerContent": "A motor vehicle must be taxed and must display the up-to-date tax disc before it may be taken on the road."
    },
    {
      "id": 51,
      "content": "If a driver wishes to drive another vehicle which is not currently taxed, would they be allowed to transfer the current tax disc from their own vehicle onto it?",
      "labels": [2],
      "options": [
        "Yes, provided their own vehicle is not being used at the same time.",
        "Only on a temporary basis if the other vehicle is subject to a lower rate of tax.",
        "Under circumstances when the proper form has been completed and sent to the local Motor Tax Office.",
        "Under no circumstances should a tax disc be transferred to another vehicle."
      ],
      "correct": 4,
      "answerContent": "A motor vehicle must be taxed and must display its own current tax disc before it may be taken on the road. The tax disc includes information about the vehicle, including its make and model, colour and registration number."
    },
    {
      "id": 52,
      "content": "When a vehicle is being driven by a person who is not the owner, who is responsible for ensuring that the vehicle is taxed and that a current tax disc is displayed?",
      "labels": [2],
      "options": [
        "The Garda\xED have total responsibility in this area.",
        "The driver and/or the owner of the vehicle are responsible.",
        "The driver is the only one responsible.",
        "The owner is the only one responsible."
      ],
      "correct": 2,
      "answerContent": "If you are the owner or the driver of a vehicle, you must ensure that it is taxed and that it displays an up-to-date tax disc before you take it on the road."
    },
    {
      "id": 53,
      "content": "When must a current tax disc be displayed on a new vehicle on a public road?",
      "labels": [2],
      "options": [
        "Not later than 10\xA0days after registration.",
        "Only when driving on motorways.",
        "At all times when the vehicle is on a public road.",
        "Not later than 1\xA0month after registration."
      ],
      "correct": 3,
      "answerContent": "A motor vehicle must be taxed before it may be taken on the road, and it must always display an up-to-date tax disc."
    },
    {
      "id": 54,
      "content": "Who is entitled to see a driver's vehicle registration document?",
      "labels": [2],
      "options": [
        "Any fire brigade or ambulance personnel at the scene of a collision the driver has been involved in.",
        "A Garda may ask you to produce the vehicles registration document at a named Garda station.",
        "A member of the car recovery company or anyone assisting in the recovery.",
        "Any person with whom the driver is involved in a collision."
      ],
      "correct": 2,
      "answerContent": "A Garda may demand to see your driving licence at any time, and you should always carry this with you when driving. A Garda may also examine your insurance disc, tax disc and NCT disc (if applicable). A Garda may ask you to produce other documents (including the vehicles registration document) at a named Garda station within 10\xA0days."
    },
    {
      "id": 55,
      "content": "If a vehicle is being driven by someone who is not the owner but has the owner's consent, who should ensure that the driver is properly insured?",
      "labels": [2],
      "options": [
        "The insurance company.",
        "The vehicle owner only.",
        "The driver and the vehicle owner.",
        "The driver only."
      ],
      "correct": 3,
      "answerContent": "All drivers must have insurance covering them to drive a vehicle on a public road. It is a serious offence to drive a vehicle that is not insured. It is also an offence to allow a vehicle that you own to be driven by an uninsured driver."
    },
    {
      "id": 56,
      "content": "Is a driver still insured to drive their vehicle after their insurance policy has expired?",
      "labels": [2],
      "options": [
        "The driver is insured up to 14\xA0days after the expiry of the policy.",
        "The driver is insured up to 10\xA0days after the expiry of the policy.",
        "The driver is insured up to 7\xA0days after the expiry of the policy.",
        "The driver is not insured after the expiry of the policy."
      ],
      "correct": 4,
      "answerContent": "All drivers must have insurance covering them to drive a vehicle on a public road. The vehicle must display an up-to-date insurance disc."
    },
    {
      "id": 57,
      "content": "If a driver wishes to drive another privately-owned vehicle but they are uncertain if they are insured to drive that vehicle, what should they do?",
      "labels": [2],
      "options": [
        "Drive if there is an insurance disc on the vehicle.",
        "Transfer the insurance disc from their own vehicle on to the vehicle they wish to drive.",
        "Drive it provided that they tell their insurance company within 10\xA0days and agree to pay any additional premium.",
        "A driver should contact their own insurer to confirm whether or not their insurance policy covers the driving of other vehicles."
      ],
      "correct": 4,
      "answerContent": "If you are in any doubt about your insurance cover, you should discuss the matter with your insurance company. It is a serious offence to drive without insurance."
    },
    {
      "id": 58,
      "content": "When a driver wishes to drive a vehicle and they are not sure if they are covered by insurance, what should they do?",
      "labels": [2],
      "options": [
        "They should check with their local Garda Station to see if they are insured.",
        "They should check with their local NDLS office to see if they are insured.",
        "They should check with their local Motor Taxation Office to see if they are insured.",
        "They should not drive until their insurance company confirms that they are insured."
      ],
      "correct": 4,
      "answerContent": "If you are in any doubt about your insurance cover, you should discuss the matter with your insurance company. It is a serious offence to drive without insurance."
    },
    {
      "id": 59,
      "content": "What is the minimum insurance cover a driver needs to drive on a public road?",
      "labels": [2],
      "options": [
        "Comprehensive.",
        "Personal Accident.",
        "Third Party, Fire and Theft.",
        "Third Party."
      ],
      "correct": 4,
      "answerContent": "As a motorist, you must have a minimum of third party insurance."
    },
    {
      "id": 60,
      "content": "If a driver passes their test using a vehicle with automatic transmission, which vehicles are they licensed to drive?",
      "labels": [2],
      "options": [
        "Only manual vehicles in the licence category.",
        "All vehicles in the licence category but only automatic vehicles on a motorway.",
        "Only automatic vehicles in the licence category.",
        "All vehicles in the licence category."
      ],
      "correct": 3,
      "answerContent": "If you pass your driving test in an automatic or adapted vehicle, your full licence will apply to that type of vehicle only. A licence restricted to automatic vehicles will have a code 78 indicated in the restrictions/information column of the licence."
    },
    {
      "id": 61,
      "content": "Where can drivers locate the Maximum Authorised Mass (MAM) of their vehicle?",
      "labels": [2],
      "options": [
        "On the NCT disc.",
        "On a metal plate on the vehicle.",
        "On the insurance disc.",
        "On the tax disc."
      ],
      "correct": 2,
      "answerContent": "The plate displaying the maximum Authorised Mass (MAM) of a vehicle is normally located under the bonnet or in the passenger compartment. If you are not sure where it is located on your vehicle, check the drivers handbook supplied with the vehicle."
    },
    {
      "id": 62,
      "content": "What colour traffic light comes on after the green?",
      "labels": [2],
      "options": [
        "Flashing amber.",
        "Green arrow.",
        "Amber only.",
        "Red only."
      ],
      "correct": 3,
      "answerContent": "The normal sequence of traffic lights is red/green/amber."
    },
    {
      "id": 63,
      "content": "What colour traffic light comes on after a non-flashing amber light?",
      "labels": [2],
      "options": [
        "Flashing red light.",
        "Flashing amber light.",
        "Red only.",
        "Green only."
      ],
      "correct": 3,
      "answerContent": "The normal sequence of traffic lights is red/green/amber."
    },
    {
      "id": 64,
      "content": "What do flashing amber lights at a pelican crossing mean?",
      "labels": [2],
      "options": [
        "A driver is entering a special speed limit area.",
        "Stop and give way to pedestrians - proceed if the way is clear.",
        "Drivers have right of way.",
        "Danger ahead. A driver must stop and wait until the light stops flashing."
      ],
      "correct": 2,
      "answerContent": "A flashing amber light at a pelican crossing means you must yield to pedestrians. You may proceed, however, if the crossing is clear."
    },
    {
      "id": 65,
      "content": "What road users must comply with traffic lights (including pedestrian lights)?",
      "labels": [2],
      "options": [
        "All road users.",
        "School children only.",
        "Drivers only.",
        "Pedestrians only."
      ],
      "correct": 1,
      "answerContent": "As road users, pedestrians must comply with traffic controls. Drivers should be aware that traffic lights and pedestrian lights can be combined at junctions and should show caution and consideration to pedestrians."
    },
    {
      "id": 66,
      "content": "Who can use a signed cycle track accompanied by a continuous white line on the left-hand side?",
      "labels": [2],
      "options": [
        "Drivers, when it is not being used by a cyclist.",
        "Drivers when overtaking a vehicle turning right.",
        "Cyclists and motorcyclists.",
        "Cyclists and users of motorised wheelchairs."
      ],
      "correct": 4,
      "answerContent": "A cycle track is for the use of cyclists and motorised wheelchairs only. No other vehicles may cross into or over a mandatory cycle track unless this is necessary in order to leave or enter a side road or a property adjacent to the cycle track."
    },
    {
      "id": 67,
      "content": "What lights indicate a zebra crossing?",
      "labels": [2],
      "options": [
        "Flashing amber beacons.",
        "Continuously lit red beacons.",
        "Flashing red beacons.",
        "Continuously lit amber beacons."
      ],
      "correct": 1,
      "answerContent": "A zebra crossing is indicated by amber flashing beacons on poles and black and white stripes on the road. You must stop for pedestrians on the crossing and for those about to cross."
    },
    {
      "id": 68,
      "content": "What do temporary traffic lights at road works mean?",
      "labels": [2],
      "options": [
        "A driver need only comply when there is oncoming traffic.",
        "A driver need not comply if a convoy of traffic is going in the same direction.",
        "A driver must comply with the lights when workers are on site only.",
        "A driver must comply with the lights at all times."
      ],
      "correct": 4,
      "answerContent": "You must comply with any temporary traffic lights used to control vehicle movements at or near road works. It is an offence not to obey these lights."
    },
    {
      "id": 69,
      "content": "When must the holder of a learner permit display L-plates on their car?",
      "labels": [2],
      "options": [
        "At all times when driving.",
        "When driving to and from work.",
        "During daylight hours.",
        "When driving on their first learner permit."
      ],
      "correct": 1,
      "answerContent": "The holder of a learner permit must display L-plates on the front and rear of their car at all times when driving on public roads."
    },
    {
      "id": 70,
      "content": "How would a driver calculate the maximum overall permitted weight of their vehicle?",
      "labels": [2],
      "options": [
        "By adding the unladen weight of the vehicle to the load permitted to be carried.",
        "By checking the unladen weight of the vehicle.",
        "By checking the weight of the load which may be carried.",
        "By calculating the unladen weight of the vehicle plus the weight of the fuel."
      ],
      "correct": 1,
      "answerContent": "The maximum permitted weight of a vehicle is the sum of the unladen weight of the vehicle plus the maximum load that may be carried in it. It is an offence to overload a vehicle, as it reduces your ability to control it effectively."
    },
    {
      "id": 71,
      "content": "What is the maximum authorised mass (MAM) of a car that may be driven by the holder of a Category B driving licence?",
      "labels": [2],
      "options": [
        "3,500 kilograms.",
        "4,000 kilograms.",
        "3,750 kilograms.",
        "3,000 kilograms."
      ],
      "correct": 1,
      "answerContent": "The holder of a Category B driving licence is not permitted to drive a vehicle with a MAM of more than 3,500\xA0kg. This restriction is noted on the licence."
    },
    {
      "id": 72,
      "content": "What is the maximum number of passengers that may be carried in a vehicle driven by the holder of a Category B driving licence?",
      "labels": [2],
      "options": [
        "9 passengers.",
        "10 passengers.",
        "7 passengers.",
        "8 passengers."
      ],
      "correct": 4,
      "answerContent": "The holder of a Category B driving licence is not permitted to drive a vehicle that has seating for more than 8 passengers excluding the driver."
    },
    {
      "id": 73,
      "content": "When can the holder of a Category W learner permit carry a passenger?",
      "labels": [2],
      "options": [
        "Only when the passenger also holds a Category W driving licence.",
        "Only when the passenger holds a Category AM driving licence.",
        "Only when the passenger holds a Category AM driving licence and the vehicle is designed to carry a passenger.",
        "Only when the passenger also holds a Category W driving licence and the vehicle is designed to carry a passenger."
      ],
      "correct": 4,
      "answerContent": "The holder of a Category W learner permit may carry a passenger in the vehicle only if: the vehicle is designed to take a passenger, and the passenger has held a full driving licence in Category W for two or more years."
    },
    {
      "id": 74,
      "content": "Is a driver allowed to use rebated (green) diesel fuel in a car on a public road?",
      "labels": [2],
      "options": [
        "Green diesel may be used in a car only in winter months.",
        "Green diesel may never be used in a car.",
        "Green diesel may be used in a car only if the car is a taxis.",
        "Green diesel may be used in a car only in summer months."
      ],
      "correct": 2,
      "answerContent": "If, in its normal use, a vehicle is used on a public road, it must use unmarked (white) diesel, as the appropriate excise duties are included in the purchase price. Drivers can be prosecuted for using green diesel in a vehicle on a public road."
    },
    {
      "id": 75,
      "content": "When must a tractor or works vehicle be fitted with a rear-view mirror?",
      "labels": [2],
      "options": [
        "A rear-view mirror is not required in a tractor or works vehicle.",
        "A rear-view mirror must be fitted only when towing a trailer over 8\xA0metres long.",
        "A rear-view mirror must always be fitted.",
        "A rear-view mirror must be fitted only when towing a trailer."
      ],
      "correct": 3,
      "answerContent": "All vehicles used on a public road must have a rear-view mirror. The mirror should be used to enable the driver to see the traffic and road conditions behind and to each side."
    },
    {
      "id": 76,
      "content": "When traffic lights are green, when should a driver not proceed?",
      "labels": [2],
      "options": [
        "When traffic is stopped waiting to turn from the road on the right.",
        "When it would be unsafe to do so.",
        "When traffic is stopped waiting to turn from the road on the left.",
        "When oncoming traffic is waiting to turn left."
      ],
      "correct": 2,
      "answerContent": "Although a green traffic light means proceed with caution, you should not enter a junction if the way is not clear or if by doing so you would cause an obstruction to other road users."
    },
    {
      "id": 77,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Stop your vehicle.",
        "Stop for school crossing ahead.",
        "Give way to traffic coming from your right.",
        "Other traffic must give way to you."
      ],
      "correct": 1,
      "answerContent": "This sign appears at junctions where a minor road joins a major road. You must stop your vehicle completely at a STOP sign.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_fxMbi.png",
      "img_name": "card 77.png"
    },
    {
      "id": 78,
      "content": "What must a driver do when this sign is accompanied by a white stop line on the road?",
      "labels": [2],
      "options": [
        "Stop no more than one car length past the line.",
        "Stop past the line.",
        "Stop at the line.",
        "Stop only if there is traffic on the major road."
      ],
      "correct": 3,
      "answerContent": "When accompanied by a STOP sign, the white stop line indicates the point at which you must stop your vehicle.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_6OMto.png",
      "img_name": "card 78.png"
    },
    {
      "id": 79,
      "content": "What must a driver do when this sign is NOT accompanied by a white stop line on the road?",
      "labels": [2],
      "options": [
        "Stop no more than one car length past the sign",
        "Stop at the sign.",
        "Stop past the sign.",
        "Stop only if there is traffic on the major road."
      ],
      "correct": 2,
      "answerContent": "Where a STOP sign is not accompanied by a white stop line, you must stop at the sign.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_kAG3V.png",
      "img_name": "card 79.png"
    },
    {
      "id": 80,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Two-way street ahead.",
        "Motorway ahead.",
        "Overtaking lane ahead.",
        "Straight ahead only."
      ],
      "correct": 4,
      "answerContent": "This sign tells you that you must proceed straight ahead. This sign is usually displayed on the entry to a one-way street.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_Zei0V.png",
      "img_name": "card 80.png"
    },
    {
      "id": 81,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Turn left only.",
        "Traffic from the right has priority.",
        "Diversion ahead to the left.",
        "Motorway to the left."
      ],
      "correct": 1,
      "answerContent": "This sign tells you that you must turn left. It is usually displayed at a junction where all traffic must turn left ? for example, in a one-way system that incorporates a junction.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_QOMuv.png",
      "img_name": "card 81.png"
    },
    {
      "id": 82,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Sharp corner to the left ahead.",
        "Diversion to the left ahead.",
        "One-way traffic to the left ahead.",
        "Turn left ahead."
      ],
      "correct": 4,
      "answerContent": "This sign tells you that you must turn left ahead. It is usually displayed on the approach to a one-way system.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_sPbHD.png",
      "img_name": "card 82.png"
    },
    {
      "id": 83,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Turn right if there is no oncoming traffic.",
        "Cul-de-sac to the right.",
        "No right turn.",
        "Yield to other traffic when turning right."
      ],
      "correct": 3,
      "answerContent": "This sign is displayed at a junction where you may not turn right.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_fMlk8.png",
      "img_name": "card 83.png"
    },
    {
      "id": 84,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Private vehicles prohibited.",
        "Parking prohibited.",
        "Parking permitted.",
        "Public service vehicles prohibited."
      ],
      "correct": 2,
      "answerContent": "This sign tells you that parking is prohibited in both directions.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_c14p8.png",
      "img_name": "card 84.png"
    },
    {
      "id": 85,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Tram lane on left.",
        "No parking inside the white line.",
        "Bus and tram lane on left.",
        "Trams emerging from left."
      ],
      "correct": 1,
      "answerContent": "This sign tells you there is a tram lane on the left. Be aware that there might be pedestrians in the area and crossing the road.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_8FwMf.png",
      "img_name": "card 85.png"
    },
    {
      "id": 86,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Junction ahead with roads of greater importance.",
        "Junction ahead with railway crossing.",
        "Junction ahead with roads of lesser importance.",
        "Junction ahead with roads of equal importance."
      ],
      "correct": 3,
      "answerContent": "This sign gives advance warning of a junction ahead with minor roads on either side. Be aware that vehicles may be emerging from the minor roads.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_IfFxN.png",
      "img_name": "card 86.png"
    },
    {
      "id": 87,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Staggered crossroads ahead with roads of equal importance.",
        "Cul-de-sac to both left and right.",
        "Traffic calming ramps ahead.",
        "Roads closed ahead to both left and right."
      ],
      "correct": 1,
      "answerContent": "This sign gives advance warning of a staggered junction ahead with roads to the left and right. Be aware that vehicles may be emerging from these roads.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_kdYOn.png",
      "img_name": "card 87.png"
    },
    {
      "id": 88,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Dual carriageway ends.",
        "Road narrows ahead.",
        "Oncoming traffic has priority.",
        "Tunnel ahead."
      ],
      "correct": 1,
      "answerContent": "This sign gives advance warning of the end of a dual carriageway. You will soon be entering a 2-way road.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_0KQNH.png",
      "img_name": "card 88.png"
    },
    {
      "id": 89,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Crosswinds ahead.",
        "Radio transmission mast ahead.",
        "Overhead electric cables.",
        "Sharp corners ahead."
      ],
      "correct": 3,
      "answerContent": "This sign gives advance warning of electric cables overhead. Drivers with a high load should be particularly careful.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_kG2na.png",
      "img_name": "card 89.png"
    },
    {
      "id": 90,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Major roadworks ahead.",
        "Level crossing ahead unguarded by gates or barriers.",
        "End of major roadworks ahead.",
        "Level crossing ahead guarded by gates or barriers."
      ],
      "correct": 2,
      "answerContent": "This sign gives advanced warning of an unguarded level crossing ahead. This is a crossing without gates or barriers and you should cross it with extreme caution.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_IrLnA.png",
      "img_name": "card 90.png"
    },
    {
      "id": 91,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Private grounds - no entry.",
        "Farm machinery crossing ahead.",
        "Road fencing ahead.",
        "Level crossing ahead guarded by gates or barriers."
      ],
      "correct": 4,
      "answerContent": "This sign gives advance warning of a railway crossing ahead that is protected by gates or lifting barriers. You should be prepared to stop and follow the required procedure.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_jlYhn.png",
      "img_name": "card 91.png"
    },
    {
      "id": 92,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "The driver must stop when red lights show.",
        "Emerging vehicles have priority. The driver must stop if necessary.",
        "Stop and wait for green light before proceeding.",
        "The driver must stop when vehicles ahead show brake lights."
      ],
      "correct": 1,
      "answerContent": "This sign gives advance warning that you must stop when red lights show. This sign may be displayed at a railway level crossing.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_FS5NA.png",
      "img_name": "card 92.png"
    },
    {
      "id": 93,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Sharp rise in the road ahead - for example, a humpback bridge.",
        "Road falls from centre to left and right.",
        "Traffic island ahead.",
        "Series of bumps or hollows ahead."
      ],
      "correct": 1,
      "answerContent": "This sign gives advance warning of a hump in the road. You should adjust your speed accordingly.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_Zi2Qg.png",
      "img_name": "card 93.png"
    },
    {
      "id": 94,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Racecourse ahead.",
        "Riding path - no vehicles allowed.",
        "Entrance to horse riding school.",
        "Accompanied horses and ponies ahead."
      ],
      "correct": 4,
      "answerContent": "This sign gives advance warning that there may be horses on the road ahead. You should show due regard for horses and their riders.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_DE2nF.png",
      "img_name": "card 94.png"
    },
    {
      "id": 95,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Beware of pedestrians at night.",
        "School ahead.",
        "Pedestrian crossing ahead.",
        "Lane reserved for pedestrians."
      ],
      "correct": 3,
      "answerContent": "This sign gives advance warning of a pedestrian crossing ahead. You should show caution and be prepared to stop.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_uJYfQ.png",
      "img_name": "card 95.png"
    },
    {
      "id": 96,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Parking for three vehicles only.",
        "Three hundred meters to the next exit.",
        "Crossing traffic ahead.",
        "Three lanes ahead."
      ],
      "correct": 2,
      "answerContent": "This is a motorway information sign that tells you that the next exit off the motorway is 300\xA0metres ahead.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_MxIHY.png",
      "img_name": "card 96.png"
    },
    {
      "id": 97,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Dual carriageway crossing ahead.",
        "No overtaking for 200\xA0metres.",
        "Sharp descent in 200\xA0metres.",
        "200\xA0metres to the next exit."
      ],
      "correct": 4,
      "answerContent": "This is a motorway information sign that tells you that the next exit off the motorway is 200\xA0metres ahead.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_ZT0jZ.png",
      "img_name": "card 97.png"
    },
    {
      "id": 98,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "100\xA0metres to the next exit.",
        "Low bridge ahead.",
        "Sharp descent for 100\xA0metres.",
        "Sharp ascent in 100\xA0metres."
      ],
      "correct": 1,
      "answerContent": "This is a motorway information sign that tells you that the next exit off the motorway is 100\xA0metres ahead.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_dmGzK.png",
      "img_name": "card 98.png"
    },
    {
      "id": 99,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Uneven surface ahead.",
        "Series of steep hills ahead.",
        "Industrial estate ahead.",
        "Pipe laying ahead."
      ],
      "correct": 1,
      "answerContent": "This roadworks warning sign tells you that the surface ahead is uneven and you should approach with caution.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_VITYL.png",
      "img_name": "card 99.png"
    },
    {
      "id": 100,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Loose chippings on road.",
        "Vehicle broken down ahead on right.",
        "Flooding up ahead on left.",
        "Uneven surface on left."
      ],
      "correct": 1,
      "answerContent": "This roadworks warning sign tells you that the road ahead has been resurfaced and there may be loose chippings. You should reduce speed while driving through this area as the loose chippings could affect your vehicles road holding and braking.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_DdkJr.png",
      "img_name": "card 100.png"
    },
    {
      "id": 101,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Traffic queues likely ahead.",
        "Parking for works vehicles on left.",
        "Three vehicles may queue ahead.",
        "Steep incline ahead."
      ],
      "correct": 1,
      "answerContent": "This roadworks warning sign tells you that there may be traffic queues ahead, possibly due to temporary traffic lights at the works. Proceed with caution.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_ND6nN.png",
      "img_name": "card 101.png"
    },
    {
      "id": 102,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Dual carriageway ahead.",
        "Mini-roundabout ahead.",
        "Start of central reserve or obstruction.",
        "Heavy vehicles have priority."
      ],
      "correct": 3,
      "answerContent": "This roadworks warning sign tells you that two-way traffic will separate to avoid an obstruction.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_Qbvht.png",
      "img_name": "card 102.png"
    },
    {
      "id": 103,
      "content": "What does this hand signal mean?",
      "labels": [2],
      "options": [
        "The cyclist intends to turn left.",
        "The cyclist intends to stop.",
        "The cyclist intends to go straight on.",
        "The cyclist is giving way to other traffic."
      ],
      "correct": 3,
      "answerContent": "This hand signal informs other road users that the cyclists intends to proceed straight ahead at a junction and drivers should show caution.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_lYIrN.png",
      "img_name": "card 103.png"
    },
    {
      "id": 104,
      "content": "What does this hand signal mean?",
      "labels": [2],
      "options": [
        "The cyclist intends to stop.",
        "The cyclist intends to overtake.",
        "The cyclist intends to turn left.",
        "The cyclist intends to dismount."
      ],
      "correct": 3,
      "answerContent": "This hand signal informs other road users that the cyclist intends to make a left-hand turn.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_ZkMAn.png",
      "img_name": "card 104.png"
    },
    {
      "id": 105,
      "content": "What does this hand signal mean?",
      "labels": [2],
      "options": [
        "The cyclist intends to cross the road.",
        "The cyclist intends to turn left.",
        "The cyclist is signalling the driver to stop.",
        "The cyclist intends to stop."
      ],
      "correct": 2,
      "answerContent": "This hand signal informs other road users that the cyclist intends to turn left.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_2ozvy.png",
      "img_name": "card 105.png"
    },
    {
      "id": 106,
      "content": "What does this hand signal mean?",
      "labels": [2],
      "options": [
        "The driver intends to turn right.",
        "The driver intends to go straight ahead.",
        "The driver intends to slow down or stop.",
        "The driver intends to turn left."
      ],
      "correct": 4,
      "answerContent": "This hand signal informs other road users that the driver intends to turn left and the vehicle will change direction.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_iFLbD.png",
      "img_name": "card 106.png"
    },
    {
      "id": 107,
      "content": "What does this hand signal mean?",
      "labels": [2],
      "options": [
        "The driver intends to move out or turn right.",
        "The driver intends to stop ahead.",
        "The driver intends to turn left.",
        "The driver intends to do a U-turn."
      ],
      "correct": 1,
      "answerContent": "This hand signal informs other road users that the driver intends to move out or turn right and the vehicle will change direction.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_ummVD.png",
      "img_name": "card 107.png"
    },
    {
      "id": 108,
      "content": "What does this hand signal mean?",
      "labels": [2],
      "options": [
        "The driver intends to turn right.",
        "The driver intends to begin a U-turn.",
        "The driver intends to turn left.",
        "The driver intends to slow down or stop."
      ],
      "correct": 4,
      "answerContent": "This hand signal informs other road users that the driver intends to slow down or stop and following traffic should be prepared to slow down also.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_SpBug.png",
      "img_name": "card 108.png"
    },
    {
      "id": 109,
      "content": "What does this hand signal mean?",
      "labels": [2],
      "options": [
        "The driver intends to turn left.",
        "The driver intends to turn right.",
        "The driver intends to stop.",
        "The driver intends to slow down."
      ],
      "correct": 1,
      "answerContent": "This hand signal informs other road users or a Garda directing traffic (facing this vehicle), that the driver intends to make a left hand turn.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_c20b8.png",
      "img_name": "card 109.png"
    },
    {
      "id": 110,
      "content": "What does this hand signal mean?",
      "labels": [2],
      "options": [
        "The driver intends to slow down.",
        "The driver intends to turn right.",
        "The driver will begin to reverse.",
        "The driver intends to turn left."
      ],
      "correct": 2,
      "answerContent": "This hand signal informs other road users or a Garda directing traffic (facing this vehicle) that the driver intends to turn right.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_zSBx4.png",
      "img_name": "card 110.png"
    },
    {
      "id": 111,
      "content": "What does this Garda signal mean?",
      "labels": [2],
      "options": [
        "Stop if approaching from behind.",
        "Proceed if approaching from the front.",
        "Proceed if approaching from behind.",
        "Stop if approaching from the front."
      ],
      "correct": 4,
      "answerContent": "When approaching a Garda giving this signal you must stop.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_PTZTH.png",
      "img_name": "card 111.png"
    },
    {
      "id": 112,
      "content": "What does this Garda signal mean?",
      "labels": [2],
      "options": [
        "Turn right.",
        "Turn left.",
        "Stop if approaching from front.",
        "Stop if approaching from behind."
      ],
      "correct": 4,
      "answerContent": "When approaching a Garda giving this signal you must stop.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_mQfyw.png",
      "img_name": "card 112.png"
    },
    {
      "id": 113,
      "content": "What does this Garda signal mean?",
      "labels": [2],
      "options": [
        "Turn right.",
        "Turn left.",
        "Stop if approaching from either the front or behind.",
        "Proceed if approaching from the front."
      ],
      "correct": 3,
      "answerContent": "When approaching a Garda giving this signal you must stop.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_Cliv4.png",
      "img_name": "card 113.png"
    },
    {
      "id": 114,
      "content": "What does this Garda signal mean?",
      "labels": [2],
      "options": [
        "The driver must not proceed to the left.",
        "The Garda is beckoning on traffic from the front.",
        "The driver must not proceed to the right.",
        "The Garda is beckoning on traffic approaching from either side."
      ],
      "correct": 4,
      "answerContent": "When approaching a Garda giving this signal you may proceed.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_nPGUn.png",
      "img_name": "card 114.png"
    },
    {
      "id": 115,
      "content": "What does this Garda signal mean?",
      "labels": [2],
      "options": [
        "Traffic approaching from the front must stop.",
        "Traffic approaching from the front may proceed.",
        "Traffic approaching from behind must stop.",
        "Traffic approaching from the right may proceed."
      ],
      "correct": 2,
      "answerContent": "When approaching a Garda giving this signal you may proceed.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_S679v.png",
      "img_name": "card 115.png"
    },
    {
      "id": 116,
      "content": "What does this road marking indicate?",
      "labels": [2],
      "options": [
        "Traffic calming.",
        "Pedestrian island.",
        "Zebra crossing.",
        "Cycle lane."
      ],
      "correct": 3,
      "answerContent": "A zebra crossing is a designated area for pedestrians to cross the road. As a driver you must always yield to pedestrians on a zebra crossing.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_YIVoz.png",
      "img_name": "card 116.png"
    },
    {
      "id": 117,
      "content": "What does this road marking indicate?",
      "labels": [2],
      "options": [
        "No entry.",
        "Speed control ramp.",
        "Pelican crossing.",
        "Zebra crossing."
      ],
      "correct": 4,
      "answerContent": "A zebra crossing is a designated area for pedestrians to cross the road. As a driver you must always yield to pedestrians on a zebra crossing",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_PJERf.png",
      "img_name": "card 117.png"
    },
    {
      "id": 118,
      "content": "What does this road marking mean?",
      "labels": [2],
      "options": [
        "A driver may overtake in this area.",
        "Road surface is uneven.",
        "Set down area only.",
        "No parking in this area."
      ],
      "correct": 4,
      "answerContent": "White zig zag lines indicate that you are approaching a pedestrian crossing. You must not park or overtake within this area.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_GPEYd.png",
      "img_name": "card 118.png"
    },
    {
      "id": 119,
      "content": "What does this road marking and information plate together mean?",
      "labels": [2],
      "options": [
        "Taxi rank at times shown.",
        "Parking not allowed at the times shown.",
        "No parking at any time.",
        "Loading bay at times shown."
      ],
      "correct": 2,
      "answerContent": "A single yellow line along the edge of a road means that you must not park there during the times shown on the accompanying information plate.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_lAZbk.png",
      "img_name": "card 119.png"
    },
    {
      "id": 120,
      "content": "What does this road marking mean?",
      "labels": [2],
      "options": [
        "A driver may not park along this road.",
        "A driver must not cross the broken white line unless it is safe to do so.",
        "A driver may not overtake along this road.",
        "A driver may overtake provided they do not cross the broken white line."
      ],
      "correct": 2,
      "answerContent": "A broken white line along the centre of the road means you must not cross the line unless it is safe to do so when overtaking or passing.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_pC86x.png",
      "img_name": "card 120.png"
    },
    {
      "id": 121,
      "content": "If driving from A to B, what do these road markings mean?",
      "labels": [2],
      "options": [
        "Road narrows ahead.",
        "Dual carriageway ahead.",
        "A driver may not overtake.",
        "A driver may overtake if it is safe to do so."
      ],
      "correct": 4,
      "answerContent": "Where there is a broken white line and a continuous white line along the centre of the road, you must obey the line that is nearest to you. In this case you may cross the lines as long as it is safe to do so.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_qTod8.png",
      "img_name": "card 121.png"
    },
    {
      "id": 122,
      "content": "If driving from A to B, what do these road markings mean?",
      "labels": [2],
      "options": [
        "A driver may cross the lines to overtake.",
        "Oncoming traffic may not cross the lines to overtake.",
        "Only motorcyclists may cross the lines to overtake.",
        "A driver may not cross the lines to overtake."
      ],
      "correct": 4,
      "answerContent": "Where there is a broken white line and a continuous white line along the centre of the road, you must obey the line that is nearest to you. In this case you may not cross the lines.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_zrO1T.png",
      "img_name": "card 122.png"
    },
    {
      "id": 123,
      "content": "What does this road marking mean?",
      "labels": [2],
      "options": [
        "Parking prohibited during business hours.",
        "Taxi parking only.",
        "Keep outside the yellow lines.",
        "Parking prohibited at all times."
      ],
      "correct": 4,
      "answerContent": "A double yellow line along the edge of the road means parking is not allowed at any time.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_MDQXs.png",
      "img_name": "card 123.png"
    },
    {
      "id": 124,
      "content": "What does this road marking mean?",
      "labels": [2],
      "options": [
        "Drivers must keep left of the continuous white line.",
        "Oncoming traffic may cross the line to overtake.",
        "Drivers may cross the line to overtake.",
        "Only motorcyclists may cross the lines to overtake."
      ],
      "correct": 1,
      "answerContent": "A single continuous white line along the centre of the road means all traffic must keep to the left of the line. You are not permitted to overtake or perform a U-turn on this section of road.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_lrgGu.png",
      "img_name": "card 124.png"
    },
    {
      "id": 125,
      "content": "What does the broken yellow line road marking mean?",
      "labels": [2],
      "options": [
        "Parking prohibited at all times.",
        "The edge of the carriageway or hard shoulder.",
        "Slow lane for heavy vehicles only.",
        "No stopping for any reason except in an emergency."
      ],
      "correct": 2,
      "answerContent": "A single broken yellow line along the side of the road marks the edge of the carriageway/hard shoulder. This is normally for the use of pedestrians and cyclists. As a driver, however, you may use it briefly to allow faster traffic to overtake, but only where it is safe to do so.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_ReH5e.png",
      "img_name": "card 125.png"
    },
    {
      "id": 126,
      "content": "What does this traffic light mean?",
      "labels": [2],
      "options": [
        "Prepare to move off.",
        "Stop, unless it is unsafe to do so.",
        "The traffic lights are out of order.",
        "Proceed if the way is clear."
      ],
      "correct": 2,
      "answerContent": "When the traffic light is showing amber you must not go beyond the stop line unless you so close to the traffic lights that stopping would be dangerous.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_3YMhV.png",
      "img_name": "card 126.png"
    },
    {
      "id": 127,
      "content": "What does this traffic light mean?",
      "labels": [2],
      "options": [
        "The driver may proceed in the direction of the green arrow if the way is clear.",
        "Traffic is not allowed to turn right.",
        "The driver must stop and wait until the full green light appears.",
        "All traffic must turn right."
      ],
      "correct": 1,
      "answerContent": "A green arrow (filter light) means that traffic may proceed in the direction of the arrow if it is safe to do so.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_HuDPE.png",
      "img_name": "card 127.png"
    },
    {
      "id": 128,
      "content": "What does this traffic light mean?",
      "labels": [2],
      "options": [
        "Traffic may proceed if turning left.",
        "Traffic may proceed if safe to do so.",
        "Traffic must stop at the traffic light.",
        "Traffic may stop if safe to do so."
      ],
      "correct": 3,
      "answerContent": "A red light means STOP. You must not go beyond the stop line or (if there is no stop line) beyond the light.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_ItOCQ.png",
      "img_name": "card 128.png"
    },
    {
      "id": 129,
      "content": "What does this traffic light mean?",
      "labels": [2],
      "options": [
        "Traffic must stop at the traffic light.",
        "Traffic may proceed but not turn right.",
        "Give way to any oncoming traffic turning right.",
        "Traffic may proceed if the way is clear."
      ],
      "correct": 4,
      "answerContent": "You may proceed on a green traffic light if it is safe to do so.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_SlcuO.png",
      "img_name": "card 129.png"
    },
    {
      "id": 130,
      "content": "Which car, if any, is parked incorrectly?",
      "labels": [2],
      "options": [
        "The red car.",
        "Neither car.",
        "The green car.",
        "Both cars."
      ],
      "correct": 4,
      "answerContent": "It is an offence to park within 15\xA0metres before or 5\xA0metres after a pedestrian crossing. Parking in this manner may restrict the zone of vision of drivers approaching the crossing and endanger pedestrians.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_BmdoR.png",
      "img_name": "card 130.png"
    },
    {
      "id": 131,
      "content": "What should a driver do when approaching traffic lights that change from green to amber?",
      "labels": [2],
      "options": [
        "Accelerate to clear the junction.",
        "Sound the horn while proceeding through the junction.",
        "Stop, unless it is unsafe to do so.",
        "Stop the vehicle immediately."
      ],
      "correct": 3,
      "answerContent": "When you are approaching a set of traffic lights showing green, you should take care and be prepared to stop if the amber light comes on.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_SmQrz.png",
      "img_name": "card 131.png"
    },
    {
      "id": 132,
      "content": "What should a driver do at an amber traffic light?",
      "labels": [2],
      "options": [
        "Continue as there is no traffic at the junction.",
        "Continue only if sure that the junction is clear of pedestrians.",
        "Stop at the line unless it is not safe to do so.",
        "Make sure to pass the lights before they turn red."
      ],
      "correct": 3,
      "answerContent": "By law you must stop at an amber traffic light if it is safe to do so.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_GUHZC.png",
      "img_name": "card 132.png"
    },
    {
      "id": 133,
      "content": "What does this sign mean at a junction?",
      "labels": [2],
      "options": [
        "Yield to traffic coming from your right only.",
        "Yield to traffic on the major road.",
        "Slow down and yield to pedestrians.",
        "Yield to all heavy goods vehicles."
      ],
      "correct": 2,
      "answerContent": "At a junction, the YIELD sign tells you that you must give way to traffic on a major road ahead. This means that you must slow down and be prepared to stop.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_GYqoQ.png",
      "img_name": "card 133.png"
    },
    {
      "id": 134,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "T-junction ahead with merging traffic.",
        "T-junction ahead with road of less importance.",
        "T-junction ahead with dual carriageway.",
        "T-junction ahead with roads of equal importance."
      ],
      "correct": 4,
      "answerContent": "This sign gives advance warning of a T-junction ahead with a road of equal importance. You must give way to traffic already on the road you are joining.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_QbRyY.png",
      "img_name": "card 134.png"
    },
    {
      "id": 135,
      "content": "What does this sign mean at a roundabout?",
      "labels": [2],
      "options": [
        "Yield to buses and trucks only.",
        "Yield to traffic coming from the right, or already on the roundabout.",
        "Yield to traffic coming from the left.",
        "Yield to cyclists and motorcyclists only."
      ],
      "correct": 2,
      "answerContent": "At a roundabout, the YIELD sign tells you that you must slow down and be prepared to stop. You must yield (give way) to traffic already on the roundabout or coming from the right.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_nA2WB.png",
      "img_name": "card 135.png"
    },
    {
      "id": 136,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Turn right only.",
        "Overtake only on the right.",
        "Diversion ahead to the right.",
        "Major road joining from the left."
      ],
      "correct": 1,
      "answerContent": "This sign tells you that you must turn right. It is usually displayed at a junction where all traffic must turn right ? for example, in a one-way system that incorporates a junction.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_3mubU.png",
      "img_name": "card 136.png"
    },
    {
      "id": 137,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Diversion to the right ahead.",
        "You must turn right ahead.",
        "Sharp bend to the right ahead.",
        "One-way traffic to the right ahead."
      ],
      "correct": 2,
      "answerContent": "This sign tells you that you must turn right ahead. It is usually displayed on the approach to a one-way system.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_e4kxv.png",
      "img_name": "card 137.png"
    },
    {
      "id": 138,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Steep decline to the left.",
        "Pass on the left.",
        "Keep left.",
        "No left turn."
      ],
      "correct": 3,
      "answerContent": "This sign tells you that you must keep left. It is usually displayed at a traffic island in the centre of the road and also used on occasion to control traffic at roadworks.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_pQobZ.png",
      "img_name": "card 138.png"
    },
    {
      "id": 139,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Traffic crossing from the left.",
        "Steep decline from the left.",
        "No right turn.",
        "Keep right."
      ],
      "correct": 4,
      "answerContent": "This sign tells you that you must keep right. It is usually found in a one-way system where the traffic is required to keep to the right and also used on occasion to control traffic at roadworks.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_bZGHf.png",
      "img_name": "card 139.png"
    },
    {
      "id": 140,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Pass either side.",
        "Two-way traffic ahead.",
        "One-way street.",
        "Dual carriageway ahead."
      ],
      "correct": 1,
      "answerContent": "This sign tells you that traffic may pass on either side of the traffic island.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_851bi.png",
      "img_name": "card 140.png"
    },
    {
      "id": 141,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "No entry ahead.",
        "Cul-de-sac ahead.",
        "Parking not allowed ahead.",
        "No overtaking ahead."
      ],
      "correct": 1,
      "answerContent": "This sign tells you that you must not proceed in the direction of the arrow. This is displayed to prevent traffic going in the wrong direction ? for example, the wrong way up a one-way street.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_Vf5oN.png",
      "img_name": "card 141.png"
    },
    {
      "id": 142,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "No right turn.",
        "Dangerous bend to the right ahead.",
        "No right turn during business hours.",
        "Turn right ahead."
      ],
      "correct": 1,
      "answerContent": "This sign is displayed at a junction where you may not turn right.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_CCsk3.png",
      "img_name": "card 142.png"
    },
    {
      "id": 143,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "No right turn.",
        "No left turn.",
        "Turn right only.",
        "Cul-de-sac to the left."
      ],
      "correct": 2,
      "answerContent": "This sign is displayed at a junction where you may not turn left.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_b0YrO.png",
      "img_name": "card 143.png"
    },
    {
      "id": 144,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Reversing not permitted.",
        "Entry to tunnel prohibited.",
        "U-turn not permitted.",
        "Two-way traffic prohibited."
      ],
      "correct": 3,
      "answerContent": "This sign tells you that you are not permitted to make a U-turn. It is commonly displayed on approach to junctions on dual carriageways. Drivers should also be aware that U-turns are also not permitted anywhere there is a continuous white line along the centre of the road or on a one-way street.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_MrkZr.png",
      "img_name": "card 144.png"
    },
    {
      "id": 145,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Motorway continues for 30\xA0kilometres.",
        "Minimum speed is 30\xA0km/h.",
        "Parking not allowed for more than 30\xA0minutes.",
        "Maximum speed is is 30\xA0km/h."
      ],
      "correct": 4,
      "answerContent": "This sign tells you that the maximum legal speed limit permitted for this section of road is 30\xA0km/h. These signs are commonly found in slow zones in residential areas.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_KS6Ih.png",
      "img_name": "card 145.png"
    },
    {
      "id": 146,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Motorway continues for 50\xA0kilometres.",
        "Maximum speed is 50\xA0km/h.",
        "Maximum distance between vehicles is 50\xA0metres.",
        "Minimum speed is 50\xA0km/h."
      ],
      "correct": 2,
      "answerContent": "This sign tells you that the maximum legal speed limit permitted for this section of road is 50\xA0km/h.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_ZbMEo.png",
      "img_name": "card 146.png"
    },
    {
      "id": 147,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Maximum speed is 60\xA0km/h.",
        "Parking not allowed for more than 60\xA0minutes.",
        "Minimum speed is 60\xA0km/h.",
        "Distance to junction is 60\xA0metres."
      ],
      "correct": 1,
      "answerContent": "This sign tells you that the maximum legal speed limit permitted for this section of road is 60\xA0km/h.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_1citr.png",
      "img_name": "card 147.png"
    },
    {
      "id": 148,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Maximum speed is 80\xA0km/h.",
        "80\xA0metres to the start of motorway.",
        "80\xA0metres to the end of motorway.",
        "Minimum speed is 80\xA0km/h."
      ],
      "correct": 1,
      "answerContent": "This sign tells you that the maximum legal speed limit permitted for this section of road is 80\xA0km/h.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_sNYhN.png",
      "img_name": "card 148.png"
    },
    {
      "id": 149,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Minimum speed is 100\xA0km/h.",
        "Maximum speed is 100\xA0km/h.",
        "Motorway continues for 100\xA0kilometres.",
        "Clearway ahead at 100\xA0metres."
      ],
      "correct": 2,
      "answerContent": "This sign tells you that the maximum legal speed limit permitted for this section of road is 100\xA0km/h.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_7nDhk.png",
      "img_name": "card 149.png"
    },
    {
      "id": 150,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Motorway continues for 120\xA0kilometres.",
        "Minimum speed is 120\xA0km/h.",
        "Maximum speed is 120\xA0km/h.",
        "Traffic merging at 120\xA0metres ahead."
      ],
      "correct": 3,
      "answerContent": "This sign tells you that the maximum legal speed limit permitted for this section of road is 120\xA0km/h.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_xM4EU.png",
      "img_name": "card 150.png"
    },
    {
      "id": 151,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Parking reserved for people with disabilities.",
        "Parking permitted during the times shown.",
        "Maximum parking for one hour during times shown.",
        "Parking prohibited at the times shown."
      ],
      "correct": 2,
      "answerContent": "These signs tells you that parking is permitted in both directions, but only at the times shown on the information plate.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_MVpcZ.png",
      "img_name": "card 151.png"
    },
    {
      "id": 152,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Road closed during the times shown.",
        "Clearway - no stopping or parking during the times shown.",
        "Crossroads ahead with roads of equal importance.",
        "Pedestrianised street - no access for vehicles."
      ],
      "correct": 2,
      "answerContent": "A Clearway sign means that stopping or parking is not permitted in this area during the times shown on the information plate.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_IrwbK.png",
      "img_name": "card 152.png"
    },
    {
      "id": 153,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Disc parking operates except during the hours shown.",
        "Parking is prohibited during the hours shown.",
        "Parking without a disc is allowed during the hours shown.",
        "Disc parking operates during the time shown."
      ],
      "correct": 4,
      "answerContent": "This sign tells you that vehicles must display a parking disc when parked during the hours shown on the information plate.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_C2RsG.png",
      "img_name": "card 153.png"
    },
    {
      "id": 154,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Private vehicles may pick up or set down passengers.",
        "Designated rank for taxis.",
        "Only taxis may turn right or left.",
        "Private parking is permitted when the taxi rank is empty."
      ],
      "correct": 2,
      "answerContent": "A Taxi Rank sign indicates that this is an area reserved for taxis, and parking or stopping by other road users is not permitted.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_y09SC.png",
      "img_name": "card 154.png"
    },
    {
      "id": 155,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Cyclists must dismount ahead.",
        "Track reserved for motorcyclist.",
        "Start of cycle track.",
        "Bicycle race track."
      ],
      "correct": 3,
      "answerContent": "This sign indicates the start of a cycle track. If the track is bounded by a broken white line, other road users should avoid using it wherever possible. If it is bounded by a continuous white line, drivers of cars and other vehicles must not drive on it.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_HUqWm.png",
      "img_name": "card 155.png"
    },
    {
      "id": 156,
      "content": "What do these signs together mean?",
      "labels": [2],
      "options": [
        "Pedestrianised street ahead - traffic not allowed except during times shown.",
        "Clearway ahead - no stopping or parking during times shown.",
        "Parking not allowed during times shown.",
        "Access for buses and taxis only during times shown."
      ],
      "correct": 1,
      "answerContent": "When posted together these signs tells you that there is a Pedestrianised street ahead and that traffic is not allowed to enter except during the times stated on the information plate.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_MVY8B.png",
      "img_name": "card 156.png"
    },
    {
      "id": 157,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "3-axled vehicles are not permitted.",
        "Maximum permitted weight is 3\xA0tonnes.",
        "Minimum permitted weight is 3\xA0tonnes.",
        "Only 3-axled vehicles are permitted."
      ],
      "correct": 2,
      "answerContent": "This sign tells you that that you must not enter this area if your vehicle is over 3\xA0tonnes or 3,000\xA0kg",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_QNamA.png",
      "img_name": "card 157.png"
    },
    {
      "id": 158,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Parking of vehicles under the weight shown is not allowed",
        "Parking in loading area is not allowed.",
        "Passing other traffic that exceeds the weight shown is not allowed.",
        "Parking of vehicles exceeding the weight shown is not allowed."
      ],
      "correct": 4,
      "answerContent": "This sign tells you that you must not park in this area if your vehicle is over the weight limit indicated.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_D3OSS.png",
      "img_name": "card 158.png"
    },
    {
      "id": 159,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Double parking not allowed.",
        "End of dual carriageway.",
        "No stopping/parking on the right.",
        "No overtaking."
      ],
      "correct": 4,
      "answerContent": "This sign tells you that overtaking is prohibited. These signs are usually found in places where overtaking may be dangerous, such as in areas with reduced visibility.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_yQdyl.png",
      "img_name": "card 159.png"
    },
    {
      "id": 160,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Only buses and cyclists may park during the times indicated.",
        "Only cyclists and buses are allowed to use the lane during the times indicated.",
        "Only buses, cyclists and taxis are allowed to use the lane outside the hours indicated.",
        "Only buses, cyclists and taxis are allowed to use the lane ahead during the hours indicated."
      ],
      "correct": 4,
      "answerContent": "This sign tells you there is a with-flow near side bus lane ahead on the left ? that is, one where the buses move in the same direction as the traffic to their right. The information plate tells the times when the bus lane is in operation. Only buses, taxis and cyclists may use the bus lane during those hours.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_4BkAP.png",
      "img_name": "card 160.png"
    },
    {
      "id": 161,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Only double-decker buses and cyclists may use lane.",
        "Cyclists and buses must turn left.",
        "With-flow bus and cycle lane ahead on left.",
        "Only buses and cyclists may park."
      ],
      "correct": 3,
      "answerContent": "This sign tells you there is a with-flow near side bus lane ahead to the left. Only buses, taxis and cyclists may use the bus lane during the stated operational hours.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_BGmj0.png",
      "img_name": "card 161.png"
    },
    {
      "id": 162,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Parking for buses and bicycles on left.",
        "Cycle track ahead may be crossed by buses only.",
        "With-flow bus and cycle lane on left.",
        "Bicycles and buses not allowed on left."
      ],
      "correct": 3,
      "answerContent": "This sign indicates a near side with-flow bus lane on the left. Only buses, taxis and cyclists may use the bus lane during the stated operational hours.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_uFBIl.png",
      "img_name": "card 162.png"
    },
    {
      "id": 163,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Buses must give way to other traffic ahead",
        "Bus and cycle lane ahead on right.",
        "Cyclists must give way to buses ahead.",
        "Buses must give way to cyclists ahead."
      ],
      "correct": 2,
      "answerContent": "This sign tells you that there is an off side bus lane ahead on the right. Only buses, taxis and cyclists may use the bus lane during the stated operational hours.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_56XCB.png",
      "img_name": "card 163.png"
    },
    {
      "id": 164,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "With-flow bus lane on the left.",
        "Buses may block the driver's view of cyclists.",
        "With-flow bus lane on the right.",
        "Contra-flow bus lane ahead."
      ],
      "correct": 3,
      "answerContent": "This sign indicates a with-flow off-side bus lane on the right. Only buses, taxis and cyclists may use the bus lane during the stated operational hours.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_qWtiU.png",
      "img_name": "card 164.png"
    },
    {
      "id": 165,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "With-flow bus lane to right.",
        "Contra-flow bus lane on the right.",
        "Cycle track may be crossed by buses.",
        "Buses emerging from right."
      ],
      "correct": 2,
      "answerContent": "This sign tells you that you must drive on the left and not use the contra-flow bus lane day or night. A contraflow bus lane is one where the buses are going in the opposite direction.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_bn6QX.png",
      "img_name": "card 165.png"
    },
    {
      "id": 166,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Contra-flow bus lane.",
        "Two-way traffic system.",
        "With-flow bus lane.",
        "Double-decker buses only."
      ],
      "correct": 1,
      "answerContent": "This sign tells you that you must drive on the left and not use the contra-flow bus lane day or night. A contra-flow bus lane is one where the buses are going in the opposite direction.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_rFbEL.png",
      "img_name": "card 166.png"
    },
    {
      "id": 167,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Tram lane on left.",
        "Tram lane on right.",
        "With-flow bus lane ahead.",
        "Parking only inside the white line."
      ],
      "correct": 2,
      "answerContent": "This sign tells you there is an off-side tram lane on the right. Drivers should also be aware that there might be pedestrians in the area.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_Dr4ft.png",
      "img_name": "card 167.png"
    },
    {
      "id": 168,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Y-Junction where heavy vehicles must go left.",
        "Y-Junction where main road bears to the left.",
        "Y-Junction where main road bears to the right.",
        "Y-Junction where vehicles must go left."
      ],
      "correct": 2,
      "answerContent": "This sign gives advance warning of a Y-junction with a minor road ahead. The wider arm of the Y indicates the course of the main road.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_yncoq.png",
      "img_name": "card 168.png"
    },
    {
      "id": 169,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Major road ahead.",
        "Crossroads ahead with roads of lesser importance.",
        "Crossroads ahead with roads of equal importance.",
        "Railway crossing ahead."
      ],
      "correct": 3,
      "answerContent": "This sign gives advance warning of a crossroad junction ahead where the roads are of equal importance. At this type of junction you should yield to traffic approaching from the right and traffic already turning.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_t45cv.png",
      "img_name": "card 169.png"
    },
    {
      "id": 170,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Y-Junction ahead with roads of lesser importance.",
        "Junction ahead with dual carriageway.",
        "Minor road ahead.",
        "Y-junction ahead with roads of equal importance."
      ],
      "correct": 4,
      "answerContent": "This sign gives advance warning of a Y-junction ahead with roads of equal importance. Approach such a junction with caution and be prepared to react to any changes in the traffic situation.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_4VihN.png",
      "img_name": "card 170.png"
    },
    {
      "id": 171,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "End of dual carriageway.",
        "Railway crossing ahead.",
        "Y-junction ahead with roads of equal importance.",
        "Minor road ahead."
      ],
      "correct": 3,
      "answerContent": "This sign gives advance warning of a Y-junction ahead with a road of equal importance. Approach such a junction with caution and be prepared to react to any changes in the traffic situation.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_mSQmh.png",
      "img_name": "card 171.png"
    },
    {
      "id": 172,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "T-junction ahead with roads of major importance.",
        "Crossroads with major road ahead.",
        "Crossroads with dual carriageway ahead.",
        "Road passing under a bridge ahead."
      ],
      "correct": 2,
      "answerContent": "This sign gives advance warning of a crossroads junction with a major road ahead. Be prepared to stop.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_IIvmJ.png",
      "img_name": "card 172.png"
    },
    {
      "id": 173,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "T-junction ahead with a road of minor importance.",
        "Cul-de-sac to the left and right.",
        "Cul-de-sac to the right.",
        "T-junction ahead with a road of major importance."
      ],
      "correct": 4,
      "answerContent": "This sign gives advance warning of a T-junction ahead with a major road. Be prepared to yield or stop as necessary.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_2CXS0.png",
      "img_name": "card 173.png"
    },
    {
      "id": 174,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "T-junction with crossroads ahead.",
        "Level crossing ahead guarded by gates.",
        "Crossroads with dual carriageway ahead.",
        "Unguarded level crossing ahead."
      ],
      "correct": 3,
      "answerContent": "This sign gives advance warning of a crossroads junction at a dual carriageway ahead. Drivers need to be observant, taking extra care for traffic coming from each direction. Yield and/or stop as appropriate.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_wlTjp.png",
      "img_name": "card 174.png"
    },
    {
      "id": 175,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Unguarded level crossing ahead.",
        "Guarded level crossing ahead.",
        "Low bridge ahead.",
        "T-junction with dual carriageway ahead."
      ],
      "correct": 4,
      "answerContent": "This sign gives advance warning of a T-junction at a dual carriageway ahead. Drivers need to be observant, taking extra care for traffic coming from each direction. Yield and/or stop as appropriate.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_x8knf.png",
      "img_name": "card 175.png"
    },
    {
      "id": 176,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "End of dual carriageway ahead.",
        "Traffic merging from the left.",
        "Traffic merging from the right.",
        "Traffic from the left has priority."
      ],
      "correct": 2,
      "answerContent": "This sign gives advance warning of traffic merging from the left. You should expect vehicles to join from the left. You may need to slow down, allowing them to merge safely.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_ehjR2.png",
      "img_name": "card 176.png"
    },
    {
      "id": 177,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Traffic merging/diverging ahead.",
        "Diversion at junction ahead.",
        "Road narrows briefly ahead.",
        "Yield to merging/diverging traffic ahead."
      ],
      "correct": 1,
      "answerContent": "This sign gives advance warning of roads both merging (entering onto the main road) and diverging (exiting the main road). Drivers should be prepared for traffic changing speed and direction as vehicles enter or exit at the junctions on the left ahead.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_2qq6t.png",
      "img_name": "card 177.png"
    },
    {
      "id": 178,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "One-way street ahead.",
        "U-turn prohibited ahead.",
        "Ring road ahead.",
        "Roundabout ahead."
      ],
      "correct": 4,
      "answerContent": "This sign gives advance warning of a roundabout ahead. You must be prepared to yield to vehicles already on the roundabout or coming from the right.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_Y2jW3.png",
      "img_name": "card 178.png"
    },
    {
      "id": 179,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Slippery road ahead.",
        "Dangerous corners ahead.",
        "Roadworks ahead, diversion in operation.",
        "Mini-roundabout ahead."
      ],
      "correct": 4,
      "answerContent": "This sign gives advance warning of a mini-roundabout ahead. You must be prepared to yield to vehicles already on the roundabout or coming from the right.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_fvo8m.png",
      "img_name": "card 179.png"
    },
    {
      "id": 180,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Junction to the left.",
        "One-way street ahead.",
        "Dangerous corner ahead.",
        "Dangerous bend ahead."
      ],
      "correct": 3,
      "answerContent": "This sign gives advance warning of a dangerous corner to the left. You may need to slow down and react to any changes in the traffic situation ahead.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_oKsQB.png",
      "img_name": "card 180.png"
    },
    {
      "id": 181,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Turn left.",
        "Dangerous corner ahead.",
        "Dangerous bend ahead.",
        "No turn left."
      ],
      "correct": 3,
      "answerContent": "This sign gives advance warning of a dangerous bend to the left. You may need to slow down and react to any changes in the traffic situation ahead.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_VjE4C.png",
      "img_name": "card 181.png"
    },
    {
      "id": 182,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Series of dangerous corners ahead.",
        "Series of dangerous bends ahead.",
        "Overhead electric cables.",
        "Slippery road ahead."
      ],
      "correct": 1,
      "answerContent": "This sign gives advance warning of a series of dangerous corners ahead. You should slow down and react to any changes in the traffic situation.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_LlVtA.png",
      "img_name": "card 182.png"
    },
    {
      "id": 183,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Steep climb ahead.",
        "Slippery road ahead.",
        "Series of dangerous corners ahead.",
        "Series of dangerous bends ahead."
      ],
      "correct": 4,
      "answerContent": "This sign gives advance warning of a series of dangerous bends ahead. You should slow down and react to any changes in the traffic situation.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_ICHik.png",
      "img_name": "card 183.png"
    },
    {
      "id": 184,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Road closed - drivers must turn back.",
        "Series of speed ramps ahead.",
        "Sharp change of direction to the left.",
        "Sharp change of direction to the right."
      ],
      "correct": 4,
      "answerContent": "This sign gives advance warning of a sharp change of direction to the right. You should slow down as you approach the hazard.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_AQRua.png",
      "img_name": "card 184.png"
    },
    {
      "id": 185,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Road narrows on the left.",
        "Merging traffic from the left.",
        "The driver must overtake on the right only.",
        "End of dual carriageway"
      ],
      "correct": 1,
      "answerContent": "This sign gives advance warning that the road narrows on the left ahead. You should show caution and prepare to adjust your road position.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_tyPWr.png",
      "img_name": "card 185.png"
    },
    {
      "id": 186,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Dual carriageway ahead.",
        "End of dual carriageway.",
        "Road narrows on both sides.",
        "Tunnel ahead."
      ],
      "correct": 3,
      "answerContent": "This sign gives advance warning that the road is narrowing on both sides ahead. You should show caution and prepare to slow down.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_kUdMn.png",
      "img_name": "card 186.png"
    },
    {
      "id": 187,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Tramline ahead.",
        "Railway tunnel ahead.",
        "Overtake only on the left ahead.",
        "Road divides ahead."
      ],
      "correct": 4,
      "answerContent": "This sign gives advance warning that the road divides ahead. You should prepare to move to the left.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_XL2iz.png",
      "img_name": "card 187.png"
    },
    {
      "id": 188,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "One-way street ahead.",
        "Dual carriageway ahead.",
        "Traffic may not stop.",
        "Two-way traffic ahead."
      ],
      "correct": 4,
      "answerContent": "This sign gives advance warning of two-way traffic ahead, with oncoming traffic in the opposite lane.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_o87Gx.png",
      "img_name": "card 188.png"
    },
    {
      "id": 189,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Uneven road surface ahead.",
        "Steep ascent ahead.",
        "River or unprotected quay ahead.",
        "Steep descent ahead."
      ],
      "correct": 4,
      "answerContent": "This sign gives advance warning of a steep descent/downward slope ahead. You should react accordingly by adjusting speed and selecting the appropriate gear.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_l92cj.png",
      "img_name": "card 189.png"
    },
    {
      "id": 190,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Steep ascent ahead.",
        "Humpback bridge ahead.",
        "Steep descent ahead.",
        "Only ascending traffic ahead."
      ],
      "correct": 1,
      "answerContent": "This sign gives advance warning of a steep ascent/upward hill ahead. You should react by selecting the appropriate gear.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_amt40.png",
      "img_name": "card 190.png"
    },
    {
      "id": 191,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Restricted weight limit for road segment indicated.",
        "Low bridge up ahead.",
        "Road narrows ahead - maximum length of vehicle is indicated.",
        "Restricted road width ahead."
      ],
      "correct": 2,
      "answerContent": "This sign gives advance warning that you are approaching a low bridge, with restricted headroom as shown on the sign.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_XRLh5.png",
      "img_name": "card 191.png"
    },
    {
      "id": 192,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Level crossing ahead unprotected by lights and barriers.",
        "Railway station ahead.",
        "Level crossing ahead protected by lights and barriers.",
        "Railway bridge ahead."
      ],
      "correct": 3,
      "answerContent": "This sign gives advance warning of a railway level crossing ahead protected by lights and barriers. The crossing may also have an audible warning alarm. You should be prepared to stop.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_Dk5gi.png",
      "img_name": "card 192.png"
    },
    {
      "id": 193,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "School crossing ahead.",
        "Animals crossing ahead.",
        "Unguarded level crossing ahead.",
        "Automatic level crossing ahead."
      ],
      "correct": 4,
      "answerContent": "This sign gives advance warning of an automatic level crossing ahead. Drivers should approach with caution and be prepared to slow down or stop as necessary.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_neLqo.png",
      "img_name": "card 193.png"
    },
    {
      "id": 194,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Road damaged ahead.",
        "Road divides ahead - pass on the left or right.",
        "Sharp depression or dip ahead.",
        "Road flooded ahead."
      ],
      "correct": 3,
      "answerContent": "This sign gives advance warning of a dip or depression in the road ahead which may be hidden and could obscure your view of oncoming traffic. You should reduce your speed accordingly and be aware that overtaking is dangerous in these areas.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_s0Af7.png",
      "img_name": "card 194.png"
    },
    {
      "id": 195,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Series of rumble strips ahead.",
        "Road works ahead.",
        "Series of bumps or hollows ahead.",
        "Steep hills ahead."
      ],
      "correct": 3,
      "answerContent": "This sign gives advance warning of a series of bumps or hollows ahead. Be prepared to reduce your speed as necessary.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_0ZjbZ.png",
      "img_name": "card 195.png"
    },
    {
      "id": 196,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Road narrows from right.",
        "Slippery road ahead.",
        "Steep hill ahead.",
        "Series of bends ahead."
      ],
      "correct": 2,
      "answerContent": "This sign gives advance warning of the potential danger of slippery road surfaces ahead.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_nnx6N.png",
      "img_name": "card 196.png"
    },
    {
      "id": 197,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Slippery road ahead.",
        "Road liable to flooding.",
        "Steep descent ahead.",
        "Unprotected quay, canal or river ahead."
      ],
      "correct": 4,
      "answerContent": "This sign gives advance warning of an unprotected area of water ahead. You should be cautious due to the extreme danger.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_R6XFF.png",
      "img_name": "card 197.png"
    },
    {
      "id": 198,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Railway level crossing ahead.",
        "Stop at zebra crossing.",
        "School children crossing ahead.",
        "Traffic signals ahead."
      ],
      "correct": 4,
      "answerContent": "This sign gives advance warning of a traffic light controlled junction ahead. This sign is generally found in areas where the lights may not be visible to drivers in good time ? for example, following a bend in the road.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_qfFqO.png",
      "img_name": "card 198.png"
    },
    {
      "id": 199,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Children's play area ahead.",
        "Pedestrian crossing ahead.",
        "School ahead.",
        "Picnic area ahead."
      ],
      "correct": 3,
      "answerContent": "This sign gives advance warning of a school ahead. You should adjust your speed and react accordingly as there may be children in the area.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_qpAlj.png",
      "img_name": "card 199.png"
    },
    {
      "id": 200,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Playground ahead.",
        "Level crossing ahead with pedestrian walkway.",
        "School children crossing ahead.",
        "Picnic area ahead."
      ],
      "correct": 3,
      "answerContent": "This sign gives advance warning that there may be school children crossing the road ahead, slow down if required and be prepared to stop.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_NBohf.png",
      "img_name": "card 200.png"
    },
    {
      "id": 201,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Children's play area ahead.",
        "School playground ahead.",
        "Railway crossing ahead.",
        "School children crossing ahead."
      ],
      "correct": 4,
      "answerContent": "This sign gives advance warning that there may be school children crossing the road ahead, slow down if required and be prepared to stop.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_Nkego.png",
      "img_name": "card 201.png"
    },
    {
      "id": 202,
      "content": "What do these signs together mean?",
      "labels": [2],
      "options": [
        "Loose chippings on the road ahead.",
        "Beware of children crossing.",
        "Slippery road - children may fall.",
        "People jogging have right of way."
      ],
      "correct": 2,
      "answerContent": "These signs are usually displayed in residential areas, and they give advance warning that children might be crossing ahead. You should proceed cautiously and be prepared to stop suddenly.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_iyXXN.png",
      "img_name": "card 202.png"
    },
    {
      "id": 203,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Cattle grid ahead.",
        "Veterinary surgery ahead.",
        "Livestock mart ahead.",
        "Possibility of cattle or farm animals ahead."
      ],
      "correct": 4,
      "answerContent": "This sign gives advance warning that there may be cattle or other farm animals on the road ahead. Slow down if required and be prepared to stop.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_uEMh2.png",
      "img_name": "card 203.png"
    },
    {
      "id": 204,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Abattoir ahead.",
        "No animals permitted ahead.",
        "Possibility of sheep ahead.",
        "Sheep market ahead."
      ],
      "correct": 3,
      "answerContent": "This sign gives advance warning that there may be sheep on the road ahead. Slow down if required and be prepared to stop.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_C7qOp.png",
      "img_name": "card 204.png"
    },
    {
      "id": 205,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "No hunting ahead.",
        "Stag hunting ahead.",
        "Deer or wild animals ahead.",
        "Wildlife reserve - no stopping."
      ],
      "correct": 3,
      "answerContent": "This sign gives advance warning that there may be deer or other wild animals coming onto the roadway. Be prepared to slow down or stop suddenly if required.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_Ph7kw.png",
      "img_name": "card 205.png"
    },
    {
      "id": 206,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Falling rocks ahead.",
        "Golf course ahead.",
        "Crosswinds ahead.",
        "Airport ahead."
      ],
      "correct": 3,
      "answerContent": "This sign gives advance warning that there may be crosswinds ahead. Crosswinds can affect the stability of your vehicle on the road. Be prepared to slow down if necessary.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_Vsmy0.png",
      "img_name": "card 206.png"
    },
    {
      "id": 207,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Low bridge ahead.",
        "Cathedral or church ahead.",
        "Historic site ahead.",
        "Tunnel ahead."
      ],
      "correct": 4,
      "answerContent": "This sign gives advance warning of a tunnel ahead. You should be aware of the procedures to follow when entering a tunnel ? which include keeping a safe distance from the vehicle ahead or removing sunglasses.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_VeMVl.png",
      "img_name": "card 207.png"
    },
    {
      "id": 208,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Falling leaves ahead.",
        "Danger of falling rocks ahead.",
        "Rugged coast ahead.",
        "Steep descent ahead."
      ],
      "correct": 2,
      "answerContent": "This sign gives advance warning that there is a danger of rocks and other debris falling onto the road. Drive with caution.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_HtlUe.png",
      "img_name": "card 208.png"
    },
    {
      "id": 209,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Airport ahead.",
        "Possibility of low flying aircraft.",
        "Aircraft museum ahead.",
        "Direction of prevailing wind."
      ],
      "correct": 2,
      "answerContent": "This sign gives advance warning that there may be low-flying aircraft in the area. Low-flying aircraft can cause distraction due to a sudden loud noise.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_uhxHQ.png",
      "img_name": "card 209.png"
    },
    {
      "id": 210,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "A driver must overtake on the left-hand side.",
        "A driver must drive on the left-hand side.",
        "A driver must merge from the left.",
        "A driver may park on the left."
      ],
      "correct": 2,
      "answerContent": "This sign is generally in areas where tourists might be travelling and reminds motorists to drive on the left. These signs are commonly found around airports and ferry ports.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_IpRgP.png",
      "img_name": "card 210.png"
    },
    {
      "id": 211,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Level crossing ahead.",
        "Bus and tramway crossing ahead.",
        "Tramway crossing ahead.",
        "Railway station."
      ],
      "correct": 3,
      "answerContent": "This sign gives advance warning sign of a tram crossing ahead. You should be prepared to stop and yield to the tram, if required.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_ZibK2.png",
      "img_name": "card 211.png"
    },
    {
      "id": 212,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "End of motorway.",
        "Toll bridge ahead.",
        "Low bridge ahead.",
        "Entry to motorway."
      ],
      "correct": 4,
      "answerContent": "This is a motorway information sign informing road users they are now entering the motorway and must obey motorway rules. This sign usually appears beside a motorway ahead sign.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_6jLIz.png",
      "img_name": "card 212.png"
    },
    {
      "id": 213,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "No overtaking for 500\xA0metres.",
        "Bridge repair 500\xA0metres ahead.",
        "Motorway ends 500\xA0metres ahead.",
        "Low bridge 500\xA0metres ahead."
      ],
      "correct": 3,
      "answerContent": "This is a motorway information sign that tells you that the motorway will end in 500\xA0metres ahead. Motorway rules will no longer apply, for example a lower speed limit may be applicable.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_6WnuP.png",
      "img_name": "card 213.png"
    },
    {
      "id": 214,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "No bridges ahead.",
        "End of overhead bridge area.",
        "No overtaking.",
        "End of motorway."
      ],
      "correct": 4,
      "answerContent": "This sign indicates the end of the motorway. You are leaving the motorway and its rules will no longer apply.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_cehjt.png",
      "img_name": "card 214.png"
    },
    {
      "id": 215,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Tree planting ahead.",
        "Building site ahead.",
        "Roadworks ahead.",
        "Mud slide ahead."
      ],
      "correct": 3,
      "answerContent": "This warning sign tells you that there are roadworks ahead. You should approach with caution and be alert for a change in the road surface, and for the presence of machinery and road workers.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_s8iRQ.png",
      "img_name": "card 215.png"
    },
    {
      "id": 216,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Slippery road.",
        "Steep hill ahead.",
        "Series of bends ahead.",
        "Road narrows from the right."
      ],
      "correct": 1,
      "answerContent": "This roadworks warning sign tells you that the surface ahead is slippery due to mud or debris and there is an increased risk of skidding.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_w0iZc.png",
      "img_name": "card 216.png"
    },
    {
      "id": 217,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Road narrows from left.",
        "Slow lane ends ahead.",
        "Left-hand lane has an uneven surface.",
        "A driver may overtake on the right only."
      ],
      "correct": 1,
      "answerContent": "This warning sign tells you that there are roadworks up ahead where the road narrows from the left creating a potential hazard.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_UkNyl.png",
      "img_name": "card 217.png"
    },
    {
      "id": 218,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "A driver may overtake on the right only.",
        "Road narrows from right.",
        "Overtaking lane ends ahead.",
        "Right hand lane has an uneven surface."
      ],
      "correct": 2,
      "answerContent": "Where there are roadworks up ahead, this warning sign tells you that the road narrows from the right creating a potential hazard.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_hKKYA.png",
      "img_name": "card 218.png"
    },
    {
      "id": 219,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "End of obstruction between lanes.",
        "Traffic merging from both sides.",
        "Road narrows on both sides.",
        "End of dual carriageway ahead."
      ],
      "correct": 3,
      "answerContent": "This roadworks warning sign tells you that the road narrows on both sides creating a potential hazard. Be prepared to slow down and drive with extra care.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_xNF2x.png",
      "img_name": "card 219.png"
    },
    {
      "id": 220,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Hitch-hiking permitted.",
        "Pedestrian crossing to right.",
        "Football stadium ahead.",
        "Flagman ahead."
      ],
      "correct": 4,
      "answerContent": "This roadworks warning sign tells you that the traffic flow ahead is controlled manually by a flagman. Be aware and follow directions given by the flagman.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_1gKSk.png",
      "img_name": "card 220.png"
    },
    {
      "id": 221,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Temporary road surface ahead.",
        "Temporary traffic signals ahead.",
        "School children crossing ahead.",
        "Railway crossing ahead."
      ],
      "correct": 2,
      "answerContent": "This roadworks warning sign tells you that temporary traffic signals are in use ahead. You should prepare to slow down, approach with caution and comply with the signal displayed.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_RQY4i.png",
      "img_name": "card 221.png"
    },
    {
      "id": 222,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Traffic may not stop.",
        "Dual carriageway ahead.",
        "One-way street.",
        "Two-way traffic."
      ],
      "correct": 4,
      "answerContent": "This warning sign tells you that during roadworks there will be two-way traffic in operation ahead. Continue to drive with extra care.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_MNAxK.png",
      "img_name": "card 222.png"
    },
    {
      "id": 223,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Traffic in nearside lane must turn left.",
        "Nearside lane of two closed.",
        "T-junction ahead in the left lane.",
        "Offside lane of two closed."
      ],
      "correct": 2,
      "answerContent": "This roadworks warning sign tells you that that the nearside (left hand) lane is closed ahead. If you are in this lane you will need to move to the offside (right hand) lane when it is safe to do so.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_3yPcS.png",
      "img_name": "card 223.png"
    },
    {
      "id": 224,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Nearside lane of three closed.",
        "Overtaking permitted, except on the left lane.",
        "No left turn.",
        "Do not drive on the hard shoulder."
      ],
      "correct": 1,
      "answerContent": "This roadworks warning sign tells you that that the nearside (left hand) lane of three is closed up ahead. If you are in this lane you will need to move to the centre (middle) lane when it is safe to do so.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_pzmxt.png",
      "img_name": "card 224.png"
    },
    {
      "id": 225,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Offside lane closed ahead.",
        "Corner ahead on offside lane.",
        "End of dual carriageway.",
        "No stopping, except in offside lane."
      ],
      "correct": 1,
      "answerContent": "This roadworks warning sign tells you that that the offside (right hand) lane of three is closed ahead. Drivers in the nearside or centre lanes should be aware that traffic may merge from the right.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_JT79P.png",
      "img_name": "card 225.png"
    },
    {
      "id": 226,
      "content": "At roadworks, what does this sign mean?",
      "labels": [2],
      "options": [
        "Proceed with caution.",
        "Proceed only when beckoned to do so.",
        "Proceed with hazard warning lights on.",
        "Proceed using hand signals only."
      ],
      "correct": 1,
      "answerContent": "This traffic control sign tells you that you may proceed with caution through road works.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_Vh4MJ.png",
      "img_name": "card 226.png"
    },
    {
      "id": 227,
      "content": "At roadworks, what does this sign mean?",
      "labels": [2],
      "options": [
        "Stop for school warden.",
        "Stop only if faced by oncoming traffic.",
        "Stop before or at the sign.",
        "Proceed if road ahead is clear."
      ],
      "correct": 3,
      "answerContent": "This traffic control sign at roadworks means you must stop.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_LjQuf.png",
      "img_name": "card 227.png"
    },
    {
      "id": 228,
      "content": "What do these signs together mean?",
      "labels": [2],
      "options": [
        "End of road.",
        "End of road works.",
        "End of speed limit.",
        "End of detour."
      ],
      "correct": 4,
      "answerContent": "Together these two signs indicate that a detour has ended.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_FymIO.png",
      "img_name": "card 228.png"
    },
    {
      "id": 229,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Bend in the road to the left ahead.",
        "Slow lane ahead for heavy traffic.",
        "Traffic should cross back to the left-hand lane ahead.",
        "Lay-by ahead."
      ],
      "correct": 3,
      "answerContent": "This roadworks warning sign tells you that the course of the road will return to the left ahead. This usually appears after a stretch where traffic was diverted to a right-hand lane.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_kmmkI.png",
      "img_name": "card 229.png"
    },
    {
      "id": 230,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Traffic should cross out to the right-hand lane ahead.",
        "Traffic calming measures ahead.",
        "Bend in the road to the right ahead.",
        "End of 'no overtaking? zone."
      ],
      "correct": 1,
      "answerContent": "This roadworks warning sign tells you that the course of the road will divert to the right ahead.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_3bLy2.png",
      "img_name": "card 230.png"
    },
    {
      "id": 231,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Tunnel ends ahead.",
        "End of central reserve or obstruction.",
        "Beware of vehicle with a wide load.",
        "Dual carriageway ends ahead."
      ],
      "correct": 2,
      "answerContent": "This roadworks warning sign tells you that traffic previously separated by the central reserve or an obstruction will revert to two-way traffic.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_6wXny.png",
      "img_name": "card 231.png"
    },
    {
      "id": 232,
      "content": "What does this hand signal mean?",
      "labels": [2],
      "options": [
        "The cyclist intends to move out or turn right.",
        "The cyclist intends to slow down.",
        "The cyclist intends to move in or turn left.",
        "The cyclist intends to stop."
      ],
      "correct": 1,
      "answerContent": "This hand signal tells other road users that the cyclist intends to either move out or make a right hand turn. Drivers should be aware that cyclists could move out into the path of their vehicle without looking.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_7PJ6r.png",
      "img_name": "card 232.png"
    },
    {
      "id": 233,
      "content": "What does this hand signal mean?",
      "labels": [2],
      "options": [
        "The cyclist is signalling following traffic to overtake.",
        "The cyclist intends to slow down or stop.",
        "The cyclist intends to move out.",
        "The cyclist intends to turn left."
      ],
      "correct": 2,
      "answerContent": "This hand signal informs other road users that cyclist intends to slow down or stop. This may indicate that the cyclist is aware of some hazard ahead, so drive with extra care.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_9CHci.png",
      "img_name": "card 233.png"
    },
    {
      "id": 234,
      "content": "What does this hand signal mean?",
      "labels": [2],
      "options": [
        "The cyclist intends to stop.",
        "The cyclist intends to turn right.",
        "The cyclist intends to turn left.",
        "The cyclist intends to slow down."
      ],
      "correct": 2,
      "answerContent": "This hand signal tells other road users that the cyclist intends to either move out or make a right hand turn. Drivers should be aware that cyclists could cross the path of their vehicle.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_2Gw9a.png",
      "img_name": "card 234.png"
    },
    {
      "id": 235,
      "content": "What does this hand signal mean?",
      "labels": [2],
      "options": [
        "The driver intends to reverse.",
        "The driver intends to proceed straight ahead.",
        "The driver intends to turn left.",
        "The driver intends to slow down or stop."
      ],
      "correct": 2,
      "answerContent": "This hand signal informs other road users or a Garda directing traffic that the driver intends to proceed straight ahead.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_X3wb8.png",
      "img_name": "card 235.png"
    },
    {
      "id": 236,
      "content": "What does this road marking mean?",
      "labels": [2],
      "options": [
        "Taxi set-down area.",
        "Traffic must not enter unless they can clear the box junction without stopping, or when turning right.",
        "Traffic entering a box junction from right and left has the right of way unless continuing straight on.",
        "Traffic entering a box junction may have right of way over traffic from both right and left."
      ],
      "correct": 2,
      "answerContent": "You must not enter the yellow box junction unless you can clear it without stopping or unless you are turning right and are prevented from doing so by oncoming traffic.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_XpQuV.png",
      "img_name": "card 236.png"
    },
    {
      "id": 237,
      "content": "What does this road marking mean?",
      "labels": [2],
      "options": [
        "A driver may overtake.",
        "A driver is approaching a Stop sign.",
        "Road narrows ahead.",
        "All traffic must keep to the left of the white line."
      ],
      "correct": 4,
      "answerContent": "Where there is a continuous white line in the centre of the road, you are not permitted to: 1. Straddle or cross the white line; 2. Overtake another vehicle; 3. Perform a U-turn; or 4. Park on the road.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_jPKwt.png",
      "img_name": "card 237.png"
    },
    {
      "id": 238,
      "content": "What does this road marking and information plate together mean?",
      "labels": [2],
      "options": [
        "Parking not allowed at the times and days shown.",
        "Parking only at times and days shown.",
        "Taxi parking only outside the times and days shown.",
        "Taxi parking only at the times and days shown."
      ],
      "correct": 1,
      "answerContent": "A single yellow line along the edge of a road means that you must not park there during the times shown on the accompanying information plate",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_YzzCK.png",
      "img_name": "card 238.png"
    },
    {
      "id": 239,
      "content": "What do these road markings mean?",
      "labels": [2],
      "options": [
        "Continuous white lines ahead.",
        "No parking allowed.",
        "Dual carriageway ahead.",
        "No overtaking allowed."
      ],
      "correct": 1,
      "answerContent": "Double broken white lines along the centre of the road alert you to continuous white lines ahead. Do not cross them unless it is safe to do so.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_Yu52y.png",
      "img_name": "card 239.png"
    },
    {
      "id": 240,
      "content": "What does this road marking mean?",
      "labels": [2],
      "options": [
        "The road ahead is a cul-de-sac.",
        "Pedestrian crossing.",
        "Private vehicles not allowed.",
        "No entry."
      ],
      "correct": 4,
      "answerContent": "This road marking indicates a one-way street. You may not enter this street.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_SRFmp.png",
      "img_name": "card 240.png"
    },
    {
      "id": 241,
      "content": "What does this traffic light mean?",
      "labels": [2],
      "options": [
        "All traffic must turn left only.",
        "Traffic turning left may proceed if the way is clear.",
        "Traffic turning left should prepare for full green to move off.",
        "Traffic is not allowed to turn left."
      ],
      "correct": 2,
      "answerContent": "A green arrow (filter light) means that traffic may proceed in the direction of the arrow if it is safe to do so",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_N9neK.png",
      "img_name": "card 241.png"
    },
    {
      "id": 242,
      "content": "What does a continuous white line along the centre of the road mean?",
      "labels": [2],
      "options": [
        "U-turn allowed during daylight hours.",
        "Traffic can overtake.",
        "No U-turn allowed.",
        "Parking allowed during business hours."
      ],
      "correct": 3,
      "answerContent": "You must never do a U-turn on any stretch of road with a continuous white line along its centre. The restricted vision at such places would make doing a U-turn very unsafe.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_6jroR.png",
      "img_name": "card 242.png"
    },
    {
      "id": 243,
      "content": "What does a continuous white line in the centre of the road mean?",
      "labels": [2],
      "options": [
        "Vehicles may cross the line for a short time.",
        "Vehicles may park during daylight hours only.",
        "Vehicles may not cross or straddle the line.",
        "Vehicles may perform a U-turn."
      ],
      "correct": 3,
      "answerContent": "You must not cross or straddle a continuous white line in the centre of the road unless you wish to enter land or premises and it is safe to do so.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_YIZ8d.png",
      "img_name": "card 243.png"
    },
    {
      "id": 244,
      "content": "What does this sign mean when displayed on the approach to a toll plaza?",
      "labels": [2],
      "options": [
        "Toll collector operating lane.",
        "Garda checkpoint to the left.",
        "Service station ahead.",
        "This lane closed - keep left."
      ],
      "correct": 1,
      "answerContent": "This sign is used at toll plazas to direct traffic into a lane where the toll charge may be paid directly to a cashier. This lane would normally be used by motorists who have neither the exact change nor an electronic tag on their vehicle.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_BtfSM.png",
      "img_name": "card 244.png"
    },
    {
      "id": 245,
      "content": "What does this sign mean when displayed on the approach to a toll plaza?",
      "labels": [2],
      "options": [
        "Cashier in this lane.",
        "Coin basket in this lane.",
        "Ticket dispenser in this lane.",
        "Electronic toll collection."
      ],
      "correct": 2,
      "answerContent": "This sign is used at toll plazas to direct traffic into a lane where the toll charge may be paid by putting the exact change into an automatic coin machine. This lane usually has a height barrier fitted to prevent large vehicles using it.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_ccZlL.png",
      "img_name": "card 245.png"
    },
    {
      "id": 246,
      "content": "What does this sign mean when displayed on the approach to a toll plaza?",
      "labels": [2],
      "options": [
        "Electronic toll not accepted in this lane.",
        "Electronic toll accepted in any lane.",
        "Payment in euros only in this lane.",
        "Electronic toll out of order in this lane."
      ],
      "correct": 2,
      "answerContent": "This sign is used at toll plazas to direct traffic into a lane where the toll charge is collected electronically. When the vehicle passes through the plaza it is identified by means of an electronic tag fitted to the front windscreen. Payment will be collected via the users account. Only vehicles fitted with the tags are allowed to use those lanes.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_TRToe.png",
      "img_name": "card 246.png"
    },
    {
      "id": 247,
      "content": "What does this sign mean?",
      "labels": [2],
      "options": [
        "Parking on left only.",
        "Soft margin on left.",
        "Slippery surface.",
        "Uneven surface."
      ],
      "correct": 4,
      "answerContent": "This roadworks warning sign tells you that the road surface may be uneven, possibly due to the resurfacing of part of a lane. Proceed with caution.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_eyEUV.png",
      "img_name": "card 247.png"
    },
    {
      "id": 248,
      "content": "What does a flashing amber arrow pointing left at a traffic light mean?",
      "labels": [2],
      "options": [
        "A driver may turn left but yield to traffic on the other road.",
        "A driver must not proceed in this direction.",
        "A driver may proceed before traffic on the other road.",
        "The driver must wait until the traffic lights turn green."
      ],
      "correct": 1,
      "answerContent": "A flashing left amber arrow at a junction means you may proceed left but must give way to pedestrians and traffic already coming through the junction on the other road.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_wu3FV.png",
      "img_name": "card 248.png"
    },
    {
      "id": 249,
      "content": "How does driving at high speed affect a vehicle's road holding?",
      "labels": [3],
      "options": [
        "The road holding ability of the vehicle is increased.",
        "The road holding ability of the vehicle is reduced.",
        "The wheel alignment keeps the tyres in full contact with the road.",
        "The suspension compensates for any unevenness in the road surface."
      ],
      "correct": 2,
      "answerContent": "Driving at high speed is a factor that affects road holding. At higher speeds the airflow under a vehicle reduces tyre grip on the road and when you are approaching a bend or corner, the momentum of the vehicle makes it more difficult to change direction."
    },
    {
      "id": 250,
      "content": "Who should first be contacted where a person has been injured in a collision?",
      "labels": [3],
      "options": [
        "The person's relatives.",
        "The injured person's insurance company.",
        "The injured person's solicitor.",
        "The emergency services."
      ],
      "correct": 4,
      "answerContent": "Where somebody has been injured in a collision, it is important to call the emergency services immediately on 999 or 112. Trained emergency services personnel know best how to attend to injured persons."
    },
    {
      "id": 251,
      "content": "What danger can arise from the power take-off shaft of a tractor?",
      "labels": [3],
      "options": [
        "If it is not covered, clothing can get caught in it.",
        "If it is not disengaged, the steering will lock.",
        "If it is not disengaged, the battery will run flat.",
        "If it is not covered, the tractor will speed up rapidly."
      ],
      "correct": 1,
      "answerContent": "If you are working at the rear of a tractor, you should bear in mind that if the power take-off shaft is not covered, loose clothing might get caught in it and lead to injury or death."
    },
    {
      "id": 252,
      "content": "When changing a wheel on a public road, what should a person do to ensure their own safety?",
      "labels": [3],
      "options": [
        "Ensure the vehicle is in reverse gear and front wheels are facing the roadway.",
        "Ensure the vehicle is in first gear and the wheels are facing the roadway.",
        "Wear reflective clothing and switch on the vehicle hazard warning lights.",
        "Ask a bystander to warn traffic by beckoning them from the middle of the road."
      ],
      "correct": 3,
      "answerContent": "When changing a wheel at the side of the road, switch on the vehicle hazard warning lights, and wear reflective or light-coloured clothing. This will help other motorists to react and slow down when passing."
    },
    {
      "id": 253,
      "content": "What should a driver do when requested to drive a vehicle that they feel is overloaded?",
      "labels": [3],
      "options": [
        "Drive the vehicle only if accompanied.",
        "Drive at a slower speed than normal.",
        "Refuse to drive the vehicle.",
        "Ensure that the load is properly restrained."
      ],
      "correct": 3,
      "answerContent": "You should not take a vehicle that you believe to be overloaded onto a public road. Overloading is dangerous, as it affects the stability and braking capabilities of the vehicle."
    },
    {
      "id": 254,
      "content": "How could towing an overloaded trailer affect a vehicle?",
      "labels": [3],
      "options": [
        "It could impair the vehicle's steering and braking.",
        "It could improve road holding on bends.",
        "It could improve the vehicle's fuel consumption.",
        "It could improve braking ability when going downhill."
      ],
      "correct": 1,
      "answerContent": "You should not take an overloaded trailer onto a public road. An overloaded trailer impairs the stability, steering and braking of the towing vehicle."
    },
    {
      "id": 255,
      "content": "What should a driver do to secure the towing vehicle before unhitching a trailer?",
      "labels": [3],
      "options": [
        "Apply the handbrake, switch off the ignition and engage a low gear.",
        "Lower the jockey wheel and then switch off the ignition.",
        "Disconnect the electrical supply to the trailer lights and lower the jockey wheel.",
        "Apply the handbrake, lower the jockey wheel and switch off the engine."
      ],
      "correct": 1,
      "answerContent": "Before unhitching a trailer, apply the handbrake, switch off the ignition and engage a lower gear, so that the towing vehicle does not move while you are unhitching the trailer."
    },
    {
      "id": 256,
      "content": "What is the minimum legal tread depth for tyres on cars?",
      "labels": [3],
      "options": [
        "2.6\xA0millimetres",
        "1\xA0millimetre",
        "1.6\xA0millimetres",
        "0.6\xA0millimetres"
      ],
      "correct": 3,
      "answerContent": "All road vehicles, except motorcycles and vintage vehicles, must have a minimum tyre tread depth of 1.6\xA0mm over the main tread. However, for safety reasons, you should replace the vehicles tyres before they become this worn."
    },
    {
      "id": 257,
      "content": "What does the load index of a tyre indicate?",
      "labels": [3],
      "options": [
        "The maximum load of the vehicle.",
        "The maximum air pressure of the tyre.",
        "The maximum load per axle.",
        "The maximum load a tyre can carry."
      ],
      "correct": 4,
      "answerContent": "The load index indicates the maximum weight that a tyre can support safely. When replacing a tyre on your vehicle, you should make sure that the new tyre maintains the proper load index for the vehicle."
    },
    {
      "id": 258,
      "content": "What effect could incorrectly aligned headlights have?",
      "labels": [3],
      "options": [
        "They could reduce battery life.",
        "They could dazzle oncoming drivers.",
        "They could cause a fire.",
        "They could wear out the bulbs prematurely."
      ],
      "correct": 2,
      "answerContent": "A driver should ensure their headlights are properly aligned so as not to dazzle oncoming drivers and also to see properly themselves."
    },
    {
      "id": 259,
      "content": "What effect does carrying a load have on a vehicle's braking ability?",
      "labels": [3],
      "options": [
        "It reduces the distance required to stop.",
        "It increases the efficiency of the brakes.",
        "It increases the distance required to stop.",
        "It has no effect provided the brakes are good."
      ],
      "correct": 3,
      "answerContent": "When driving a vehicle which is carrying a load, the driver should be aware that the forces acting on the vehicle will increase the distance required to stop. The driver should allow for this by increasing the distance from the vehicle in front."
    },
    {
      "id": 260,
      "content": "What effect does towing a loaded trailer have on stopping ability?",
      "labels": [3],
      "options": [
        "It reduces the stopping distance.",
        "It increases the efficiency of the brakes.",
        "It has no effect on stopping distance.",
        "It increases the stopping distance."
      ],
      "correct": 4,
      "answerContent": "If you are towing a loaded trailer, you need to be aware that your braking distance could be considerably greater, depending on the weight and size of the trailer. The driver should allow for this by increasing the distance from the vehicle in front."
    },
    {
      "id": 261,
      "content": "Which of the following statements is true in relation to tyre pressure and driving on a motorway?",
      "labels": [3],
      "options": [
        "The driver should increase the rear tyre pressure in order to cope with sustained high speed.",
        "The driver should increase the front tyre pressure in order to cope with sustained high speed.",
        "The driver should reduce tyre pressure because high speeds will cause them to heat up.",
        "The driver should ensure that tyre pressure is correct, in line with the manufacturer's recommendations."
      ],
      "correct": 4,
      "answerContent": "The driver should ensure that the tyre pressure of their vehicle is correct at all times. Correct tyre pressure is especially important when travelling long distances, on motorways and at speed."
    },
    {
      "id": 262,
      "content": "What should a driver do when involved in an incident where nobody is injured but the vehicles are causing a danger or obstruction on the road?",
      "labels": [3],
      "options": [
        "Move all passengers and put a red warning triangle on the road.",
        "Take care when moving damaged vehicles and make every effort to warn other traffic.",
        "Halt all traffic until it has been established who is at fault.",
        "Wait for the Garda\xED to arrive before moving the vehicles."
      ],
      "correct": 2,
      "answerContent": "In a collision where nobody is injured and there is only minor damage to vehicles, the vehicles should be moved to the side of the road to ensure that they do not cause an obstruction or endanger other road users."
    },
    {
      "id": 263,
      "content": "What should a driver do if involved in an incident where there is damage to property only?",
      "labels": [3],
      "options": [
        "It is only necessary to report the incident to the Garda\xED within 10\xA0days.",
        "There is no need to report the incident if there is no damage to the vehicle.",
        "Report the incident both to the property owner and the Garda\xED within 48\xA0hours.",
        "It is not necessary to report it to the Garda\xED provided it has been reported to the property owner."
      ],
      "correct": 4,
      "answerContent": "If the incident causes damage to property only and there is a Garda present, it must be reported to the Garda. If there is no Garda present, the owner or the person in charge of the property must be informed. If neither are present then the relevant information must be provided at a Garda Station as soon as possible."
    },
    {
      "id": 264,
      "content": "What should a driver do where a person has been injured in a collision?",
      "labels": [3],
      "options": [
        "Move the victim to the side of the road.",
        "Move the vehicles out of the way to avoid causing obstruction.",
        "Always move the victim and the vehicles.",
        "Move the victim only if there is a risk of fire or further injury."
      ],
      "correct": 4,
      "answerContent": "Never move an injured person at the scene of a collision unless there is a risk of fire or further injury. Moving an injured person could add to their injuries. Trained personnel know best how to attend to injured persons. Call the emergency services (on 999 or 112) or make sure that someone else has called them."
    },
    {
      "id": 265,
      "content": "What type of drink should be given to a person who has been injured in a collision?",
      "labels": [3],
      "options": [
        "A cold drink.",
        "No drink should be given.",
        "A non-alcoholic drink.",
        "A hot drink."
      ],
      "correct": 2,
      "answerContent": "A person who has been injured in a collision should not be given anything to drink, as this could cause them to choke. Ideally trained personnel should be consulted before attending to an injured person. Call the emergency services (on 999 or 112) or make sure that someone else has called them."
    },
    {
      "id": 266,
      "content": "What should a driver do to assist a person who is unconscious following a collision?",
      "labels": [3],
      "options": [
        "Raise the person's head and hold it in that position.",
        "Try to keep the person warm with a blanket or overcoat.",
        "Try and get the person to drink something warm.",
        "Move the person to the nearest hospital immediately."
      ],
      "correct": 2,
      "answerContent": "If a person is unconscious following a collision, a driver should try to keep them warm with a blanket or overcoat until the emergency services arrive. Call the emergency services (on 999 or 112) or make sure that someone else has called them."
    },
    {
      "id": 267,
      "content": "If a driver is involved in a serious collision with an uninsured motorist, where nobody is injured, who should it be reported to?",
      "labels": [3],
      "options": [
        "The Irish Insurance Federation.",
        "The National Driver Licence Service (NDLS)",
        "The driver's insurance company and the Garda\xED.",
        "The local Motor Taxation Office."
      ],
      "correct": 3,
      "answerContent": "If you are involved in a serious collision, you should always report it to the Garda\xED and to your insurance company."
    },
    {
      "id": 268,
      "content": "What should a driver do if involved in a collision with another vehicle where nobody is injured?",
      "labels": [3],
      "options": [
        "Submit a written report to the Insurance Bureau of Ireland.",
        "Give their name and address only to the other person.",
        "Exchange no details but report the incident to the Garda\xED.",
        "Exchange all relevant details with the other driver."
      ],
      "correct": 4,
      "answerContent": "If a you are involved in a collision with another vehicle where nobody is injured, you should exchange all the relevant details with the other driver ? including name, address, vehicle registration, make and model and all insurance details."
    },
    {
      "id": 269,
      "content": "What should a driver do if they arrive at the scene of a collision involving a vehicle carrying hazardous materials?",
      "labels": [3],
      "options": [
        "Contact the haulage company who own the vehicle.",
        "Try to prevent any further leakage of hazardous materials before raising the alarm.",
        "Keep well clear and call the emergency services.",
        "Try to move the vehicle to a safe place."
      ],
      "correct": 3,
      "answerContent": "If a driver arrives at the scene of a collision involving a vehicle carrying hazardous materials, they should keep well clear of the scene. Call the emergency services on 999 or 112 and give them as much information as you can about the marking labels on the vehicle. You should also warn other road users about the danger. Allow the emergency services to do any rescuing."
    },
    {
      "id": 270,
      "content": "How does the driver know the vehicle's total load-carrying capacity?",
      "labels": [3],
      "options": [
        "By checking the horse power of the engine.",
        "By measuring the size of the boot.",
        "By referring to the vehicle manufacturer's specification.",
        "By counting the number of seats."
      ],
      "correct": 3,
      "answerContent": "Design Gross Vehicle Weight is the term used by manufacturers for the weight of the vehicle together with the maximum load it is designed to carry. Drivers must understand the carrying capacity of their vehicle. Overloading your vehicle will make it more difficult to control, and its an offence."
    },
    {
      "id": 271,
      "content": "What determines the maximum allowed towing capacity of a vehicle?",
      "labels": [3],
      "options": [
        "The manufacturer's specifications.",
        "The strength of the tow bar.",
        "The size of the tyres on the vehicle.",
        "The combined weight of the vehicle and its trailer."
      ],
      "correct": 1,
      "answerContent": "The maximum weight that your vehicle can safely tow is specified by the manufacturer, and is usually set out in the drivers handbook for the vehicle, and in some cases on a plate attached to the vehicle. This is the safe towing limit for the vehicle and you should not exceed it."
    },
    {
      "id": 272,
      "content": "What effect can overloading a vehicle have on its road-holding?",
      "labels": [3],
      "options": [
        "Provided the load is evenly distributed, it improves the stability of the vehicle.",
        "The load can make the vehicle more difficult to control.",
        "The load can make the vehicle more difficult to control, but only when reversing.",
        "The load can make the vehicle more difficult to control, but only when going downhill."
      ],
      "correct": 2,
      "answerContent": "Overloading your vehicle will make it more difficult to control. Remember: its an offence to overload a vehicle."
    },
    {
      "id": 273,
      "content": "What would be the effect of overloading a vehicle with passengers or goods?",
      "labels": [3],
      "options": [
        "It would not have any effect provided speed is reduced.",
        "It would reduce the driver's ability to control the vehicle.",
        "It would improve the vehicle's road-holding ability.",
        "Overloading will not reduce the ability to control the vehicle."
      ],
      "correct": 2,
      "answerContent": "Overloading your vehicle will make it more difficult to control, and will increase the risk of a collision."
    },
    {
      "id": 274,
      "content": "What effect could an unevenly distributed load have on a vehicle?",
      "labels": [3],
      "options": [
        "It could make the vehicle unstable while turning.",
        "It could cause the clutch to slip while accelerating.",
        "It could cause the vehicle to overheat.",
        "It could cause the gear box to overheat."
      ],
      "correct": 1,
      "answerContent": "When loading a vehicle you should ensure that the load is distributed evenly. An unevenly distributed load may change the vehicles centre of gravity and this could affect the braking and steering."
    },
    {
      "id": 275,
      "content": "Why is it important to ensure that the vehicle headlights are correctly aligned?",
      "labels": [3],
      "options": [
        "To reduce battery consumption.",
        "To enable the driver to see properly.",
        "To enable the driver to drive faster in the dark.",
        "To increase the lifespan of the headlights."
      ],
      "correct": 2,
      "answerContent": "A driver should ensure their headlights are properly aligned so as not to dazzle oncoming drivers and also to see properly themselves."
    },
    {
      "id": 276,
      "content": "In general, how frequently should a vehicle's lights be checked?",
      "labels": [3],
      "options": [
        "At major service intervals.",
        "Daily before driving.",
        "At minor service intervals.",
        "When wintertime approaches."
      ],
      "correct": 2,
      "answerContent": "A driver is responsible for their vehicles roadworthiness and they should check it daily before driving. Among the checks they should make are that all the lights are clean and in working order."
    },
    {
      "id": 277,
      "content": "What effect can a broken lens have on headlights?",
      "labels": [3],
      "options": [
        "It can cause the bulb to overheat.",
        "It can reduce and distort the beam.",
        "It can cause other bulbs to blow if not fixed immediately.",
        "It can increase the brightness of the beam in the other headlight."
      ],
      "correct": 2,
      "answerContent": "A driver is responsible for their vehicles roadworthiness and they should check it at regular intervals. Among the checks they should make are that all the lights are in working order. If they find defects in the lights, such as a broken lens, they should have them repaired or replaced as soon as possible."
    },
    {
      "id": 278,
      "content": "A driver wishes to drive at night, but the off-side (right-hand side) headlight bulb is blown. What should the driver do?",
      "labels": [3],
      "options": [
        "Not drive until the bulb is replaced.",
        "Replace it temporarily with the near-side (left-hand side) bulb.",
        "Drive with the hazard lights on.",
        "Replace it temporarily with the brake-light bulb."
      ],
      "correct": 1,
      "answerContent": "A driver is responsible for their vehicles roadworthiness and they should check it at regular intervals. Drivers must not drive on the road unless their vehicles headlights are in good working order, adjusted properly and clean."
    },
    {
      "id": 279,
      "content": "How would a driver know that a brake-light bulb is not working?",
      "labels": [3],
      "options": [
        "They would notice the brake pedal getting softer under pressure.",
        "They would notice the brake pedal become firmer under pressure.",
        "By standing at the rear of the vehicle and getting another person to turn on side lights.",
        "By standing at the rear of the vehicle and checking as another person presses the brake pedal."
      ],
      "correct": 4,
      "answerContent": "In order for a driver to know that the rear brake lights are working correctly, they should stand at the rear of the vehicle and check that the brake lights come on while another person presses the brakes."
    },
    {
      "id": 280,
      "content": "Is it permissible to drive a vehicle on a public road when the brake lights are not working?",
      "labels": [3],
      "options": [
        "Yes, during lighting-up times.",
        "No, unless driving in a built-up area.",
        "No, it is never permitted to be driven.",
        "Yes, outside of lighting-up times."
      ],
      "correct": 3,
      "answerContent": "A driver must always ensure that their vehicles brake-lights are clean and working correctly before driving on a public road. Never drive a vehicle when the brake lights are not working properly."
    },
    {
      "id": 281,
      "content": "What should a driver do if a system warning light lights up on the dashboard of their vehicle whilst driving?",
      "labels": [3],
      "options": [
        "Continue to drive and listen for any unusual sounds.",
        "Continue for a distance to see if the light goes out.",
        "Stop and check the problem.",
        "Carry on and check the problem later."
      ],
      "correct": 3,
      "answerContent": "If a system warning light lights up while you are driving, you should stop in a safe place as soon as possible and investigate the problem before deciding what action to take. It is important to understand the meaning of your vehicles warning lights, information on which can be found in the vehicles handbook."
    },
    {
      "id": 282,
      "content": "What should a driver do if a red system warning light lights up on the dashboard of their vehicle?",
      "labels": [3],
      "options": [
        "Drive to the nearest garage and have it checked.",
        "Stop and investigate the cause.",
        "Continue on and listen for any unusual sounds.",
        "Continue on and see if it goes out."
      ],
      "correct": 2,
      "answerContent": "If a red system warning light comes on while you are driving, you should stop in a safe place as soon as possible and investigate the problem before deciding what action to take. It is important to understand the meaning of your vehicles warning lights, information on which can be found in the vehicles handbook."
    },
    {
      "id": 283,
      "content": "What is the purpose of the red reflectors at the rear of a vehicle?",
      "labels": [3],
      "options": [
        "They reflect light at night to make other road users aware of the vehicle.",
        "They warn the driver behind to switch to main beam.",
        "They warn pedestrians of the vehicle's location.",
        "They are a substitute in case of brake-light failure."
      ],
      "correct": 1,
      "answerContent": "Motor vehicles are fitted with red reflectors to make it easier to be seen by other road users. Drivers should keep reflectors clean, intact and check them by shining a light on them to make sure that they are working effectively. Whilst driving, drivers should be cautious as red reflectors may be an indication of both parked/stationery or moving vehicles ahead."
    },
    {
      "id": 284,
      "content": "If, when driving along, the driver notices that the engine power is lower than normal, what should they do?",
      "labels": [3],
      "options": [
        "Have the vehicle checked by a competent person.",
        "Switch to a different fuel.",
        "Replace the engine oil filter.",
        "Adjust the fuel mixture control mechanism."
      ],
      "correct": 1,
      "answerContent": "If the driver notices that the vehicle seems underpowered when driving, this could present a number of problems, e.g. lack of power when overtaking. The driver should have it checked by a competent person as soon as possible as there may be a number of causes, some of which may deteriorate further."
    },
    {
      "id": 285,
      "content": "While driving, a driver notices a strong smell of fuel. What should they do?",
      "labels": [3],
      "options": [
        "Stop where safe and investigate.",
        "Drive at a reduced speed.",
        "Open the windows and continue on.",
        "Turn on the fan to clear the air."
      ],
      "correct": 1,
      "answerContent": "A strong smell of fuel is usually an indication that something is wrong, and drivers should stop and investigate as soon as possible. Leaking or spilling petrol can be dangerous because it is so combustible, and leaking diesel fuel can make the road very slippery."
    },
    {
      "id": 286,
      "content": "While driving, the driver notices the vehicle temperature gauge showing red. What should they do?",
      "labels": [3],
      "options": [
        "Stop in a safe place and have the problem investigated.",
        "Drive to the nearest service depot and top-up the water in the radiator.",
        "Remove the filler cap from the radiator and check for leakage.",
        "Do not drive until an anti-waxing agent is added to the coolant."
      ],
      "correct": 1,
      "answerContent": "Many vehicles are fitted with various warning lights and gauges. A warning light or a red zone on a temperature gauge means the engine is starting to overheat and the vehicle should not be driven until the problem is rectified. Refer to the vehicle handbook for further information and guidance or seek advice from a competent person."
    },
    {
      "id": 287,
      "content": "What should a driver do if they notice steam rising from the engine compartment?",
      "labels": [3],
      "options": [
        "Top up with anti-freeze immediately.",
        "Increase speed to increase the air flow into the engine compartment.",
        "Remove the filler cap from the coolant bottle.",
        "Stop where safe and investigate the cause."
      ],
      "correct": 4,
      "answerContent": "If a driver notices steam rising from the engine compartment of their vehicle, they should stop where safe and only investigate the cause once it has cooled down. Do not remove a radiator or header tank cap when the engine is hot. Steam rising from the engine is an indication that the engine is overheating and it should not continue to be driven. Refer to the vehicle handbook for further information and guidance or seek advice from a competent person."
    },
    {
      "id": 288,
      "content": "If a driver notices that structural parts of their vehicle's body have been affected by rust, what should they do?",
      "labels": [3],
      "options": [
        "Treat the area with grease and paint over it.",
        "Have paint sprayed over it of the same colour.",
        "Have it sandpapered and keep the affected area dry.",
        "Have it repaired by a competent repair shop."
      ],
      "correct": 4,
      "answerContent": "Over time vehicles may become affected by rust to various degrees. Drivers should inspect their vehicles periodically and if they find signs of rust they should have it assessed and repaired if necessary to prevent further deterioration. A weakened vehicle structure may have serious consequences in the event of a collision."
    },
    {
      "id": 289,
      "content": "After changing a wheel on a vehicle, which of the following should be checked soon afterwards?",
      "labels": [3],
      "options": [
        "The tyre tread depth.",
        "The wheel nuts.",
        "The brake pad clearance.",
        "The air valve."
      ],
      "correct": 2,
      "answerContent": "After changing a wheel on a vehicle it is recommended to check the wheel nuts after a short period of driving to ensure they are still properly secured."
    },
    {
      "id": 290,
      "content": "In general, how often should a driver check the tyre pressure of a vehicle?",
      "labels": [3],
      "options": [
        "Monthly.",
        "Six monthly.",
        "Annually.",
        "Regularly."
      ],
      "correct": 4,
      "answerContent": "Drivers have a legal responsibility to make sure that their vehicle is roadworthy. To do this, they should carry out regular, weekly and periodic checks, including a weekly tyre pressure check. Incorrectly inflated tyres may cause vehicle instability, uneven tyre wear and longer stopping distances."
    },
    {
      "id": 291,
      "content": "What is the main reason for maintaining the correct tyre pressures?",
      "labels": [3],
      "options": [
        "To help maintain the correct ground clearance.",
        "To stop the vehicle from sloping to the left.",
        "To reduce engine wear.",
        "To help provide optimum road holding."
      ],
      "correct": 4,
      "answerContent": "The vehicle manufacturer specifies the pressure to which tyres on a vehicle should be inflated. This is the pressure that gives the best performance in road holding, efficient braking and fuel consumption. Some manufacturers specify different pressures for front and rear tyres."
    },
    {
      "id": 292,
      "content": "A fault in which component may lead to uneven or excessive tyre wear?",
      "labels": [3],
      "options": [
        "Accelerator.",
        "Clutch.",
        "Gearbox.",
        "Suspension."
      ],
      "correct": 4,
      "answerContent": "If a vehicle has a worn suspension it may lead to uneven or excessive tyre wear. If drivers notice that their tyres are unevenly worn, they should investigate the reason and have it repaired by a competent person."
    },
    {
      "id": 293,
      "content": "What can be affected by driving on under-inflated tyres?",
      "labels": [3],
      "options": [
        "The exhaust system.",
        "Fuel consumption.",
        "Oil pressure.",
        "The coolant system."
      ],
      "correct": 2,
      "answerContent": "Incorrect tyre pressure adversely affects many of a vehicles systems, including brakes, suspension and steering. In particular, under-inflated tyres can increase the vehicles fuel consumption. Check tyre pressures regularly and ensure they are inflated as per manufacturer's recommendations."
    },
    {
      "id": 294,
      "content": "When should tyre pressure be checked?",
      "labels": [3],
      "options": [
        "At service intervals only.",
        "When the tyres are cold.",
        "When the tyres are hot.",
        "When the tyres are part-worn."
      ],
      "correct": 2,
      "answerContent": "Drivers should check the tyre pressure in their vehicle at least once a week and before commencing a long journey. For accuracy, do this when the tyres are cold and using a reliable gauge. Tyres should always be inflated according to the vehicle manufacturers guidelines, information on which can be found in the vehicle handbook."
    },
    {
      "id": 295,
      "content": "During a weekly check, a driver notices a badly worn front tyre. What should the driver do?",
      "labels": [3],
      "options": [
        "Fit the worn tyre on one of the rear wheels.",
        "Have the worn tyre replaced.",
        "Reduce speed when driving on wet roads.",
        "Check the tyre pressure to ensure it remains constant."
      ],
      "correct": 2,
      "answerContent": "The tyres are the vehicles only contact with the road, the area of contact is small and, if worn, will not grip properly and safely. The quality of the tyres on a vehicle is an important factor in the vehicles road holding and braking ability. Drivers should check their tyres regularly and if they notice that a tyre is badly worn, they should replace it immediately. Whilst the minimum legal tread depth for tyres on most vehicles is 1.6\xA0mm (1\xA0mm for motorcycles), drivers should replace a tyre before it becomes this worn."
    },
    {
      "id": 296,
      "content": "What does worn tread along the edge of the inside of a tyre suggest?",
      "labels": [3],
      "options": [
        "Steering alignment may be faulty.",
        "Air pressure is low.",
        "The vehicle has been driven too fast around corners.",
        "Air pressure is high."
      ],
      "correct": 1,
      "answerContent": "If a driver notices the inside edge of the tyre is worn, this may indicate a problem with the steering alignment. This is a potentially dangerous problem, and should be fixed by a competent person as soon as possible. Failure to do so may result in a blow-out and loss of control of the vehicle."
    },
    {
      "id": 297,
      "content": "With regard to tyres, what should a driver do before starting a long journey?",
      "labels": [3],
      "options": [
        "Increase the air pressure in the tyres.",
        "Reduce the air pressure in the tyres.",
        "Reduce front tyre air pressure and increase rear tyre air pressure.",
        "Check the tyres are inflated to normal air pressure."
      ],
      "correct": 4,
      "answerContent": "It is important to check the tyre pressure before starting a long journey as incorrect air pressure can adversely affect many of the vehicles systems, including brakes, steering, suspension and fuel consumption. Tyres should always be inflated according to the vehicle manufacturers guidelines, information on which can be found in the vehicle handbook."
    },
    {
      "id": 298,
      "content": "Under what circumstances would a driver increase the air pressure in the tyres?",
      "labels": [3],
      "options": [
        "When taking a journey with additional passengers.",
        "When the journey exceeds 200\xA0km.",
        "When higher speeds are anticipated on motorway driving.",
        "When the tread depth on the tyres is below 2\xA0mm."
      ],
      "correct": 1,
      "answerContent": "Before starting a journey with extra passengers or loads, drivers should check the air pressure and when they inflate the tyres, they should increase the vehicles tyre pressures in accordance with the vehicle manufacturers recommended tyre pressure. This information can be found in the vehicle manufacturers handbook."
    },
    {
      "id": 299,
      "content": "What should the driver do to secure the vehicle when changing a front nearside (left-hand side) wheel?",
      "labels": [3],
      "options": [
        "Point the front wheels towards the kerb.",
        "Point the front wheels away from the kerb.",
        "Ensure that the vehicle cannot roll when jacked up.",
        "Ensure the gear lever is in neutral."
      ],
      "correct": 3,
      "answerContent": "If a driver has to change a front nearside (left-hand side) wheel, make sure to do it in a safe place on level ground. Take care, wear high visibility vest/jacket, use a warning triangle and hazard warning lights as appropriate. The vehicle should be secured by applying the parking brake (hand brake), switching off the engine, engaging a low gear and using a wheel chock if necessary. If unfamiliar with how to change a wheel seek assistance from a competent person."
    },
    {
      "id": 300,
      "content": "What is the most common cause of heavy steering?",
      "labels": [3],
      "options": [
        "Poorly oiled steering.",
        "Under-inflated tyres.",
        "Badly worn brakes.",
        "Over-inflated tyres."
      ],
      "correct": 2,
      "answerContent": "Heavy steering is when a driver needs to use more effort than usual to turn the steering wheel, this may be as a direct result of under-inflated tyres. Check your tyre pressures but be aware there may be other causes of heavy steering such as low power steering fluid level. Seek advice from a competent person and have this investigated immediately."
    },
    {
      "id": 301,
      "content": "Which of the following is a driver required to keep in good condition?",
      "labels": [3],
      "options": [
        "Radio.",
        "Upholstery.",
        "Seatbelts.",
        "Paintwork."
      ],
      "correct": 3,
      "answerContent": "Drivers are responsible for their vehicles roadworthiness and should check them at regular intervals. Among the checks they should make are that all the seatbelts (drivers and passengers) are clean, untangled and in good working order."
    },
    {
      "id": 302,
      "content": "What should a driver do before towing a caravan?",
      "labels": [3],
      "options": [
        "Ensure that only adult passengers are seated in the caravan.",
        "Ensure all passengers are securely seated in the caravan.",
        "Have an extended mirror fitted to the driver's side of the vehicle only.",
        "Have extended mirrors fitted to the towing vehicle."
      ],
      "correct": 4,
      "answerContent": "If a driver intends towing a caravan, they should fit extended mirrors to both sides of the towing vehicle. This will allow the driver to better observe the traffic situation behind and to the sides."
    },
    {
      "id": 303,
      "content": "What should a driver do if condensation is affecting the vehicle's windows?",
      "labels": [3],
      "options": [
        "Make sure that all demister vents and windows are closed.",
        "Drive for a few kilometres with a window open.",
        "Dry the windows with a cloth and then use the demister system.",
        "Wipe the windows with the back of the hand."
      ],
      "correct": 3,
      "answerContent": "Make sure the windows are clear and clean at all times so that the driver can see the road and traffic conditions all around. Condensation on the window can seriously impair your ability to make proper observations. Drivers should familiarise themselves with how to correctly set the vehicle's ventilation system in order to keep the windows clear."
    },
    {
      "id": 304,
      "content": "How can sunlight affect visibility in a car with grimy windows?",
      "labels": [3],
      "options": [
        "It can enhance visibility.",
        "It can seriously reduce visibility.",
        "It can cause objects to seem further away than they are.",
        "It can cause objects to seem closer than they are."
      ],
      "correct": 2,
      "answerContent": "It is essential that all vehicle windows are clear and clean at all times so that drivers can see road and traffic conditions all around. Dirty windows are a particular hazard when the sun is low in the sky. Dirty windows also decrease visibility during hours of twilight and darkness."
    },
    {
      "id": 305,
      "content": "What should a driver do if the right-hand headlight bulb fails when driving at night?",
      "labels": [3],
      "options": [
        "Drive with the hazard lights on.",
        "Replace it temporarily with the left-hand headlight bulb.",
        "Have the bulb replaced immediately.",
        "Replace it temporarily with the brake light bulb."
      ],
      "correct": 3,
      "answerContent": "Vehicles (except motorcycles) are required by law to have right and left headlights. Faulty lights should be repaired immediately. A vehicle with only one headlight can cause a hazard to other road users or be mistaken for a motorcycle."
    },
    {
      "id": 306,
      "content": "Generally what lighting must a car, tractor or works vehicle have when driving?",
      "labels": [3],
      "options": [
        "Headlights, number plate and rear reflectors only.",
        "Headlights, brake lights and indicators only",
        "Headlights and a reversing light.",
        "Headlights, front and rear side lights, rear number plate light, red rear reflectors, brake lights and indicators."
      ],
      "correct": 4,
      "answerContent": "In general all cars, tractors and works vehicles are required by law to have headlights, front and rear side lights, rear number plate light, rear reflectors, brake lights and indicators. There are some exceptions to this, such as Electric cars with a maximum speed of 38\xA0km/h."
    },
    {
      "id": 307,
      "content": "What danger could be associated with driving a tractor and trailer over a humpbacked bridge?",
      "labels": [3],
      "options": [
        "The trailer's parking brake could automatically engage.",
        "The trailer could become detached.",
        "The tractor's suspension could smooth out the bump.",
        "The trailer could jack-knife."
      ],
      "correct": 2,
      "answerContent": "Before towing a trailer, a driver should ensure that the tow hitch has sufficient ground clearance. If this hits the road, for example when travelling over a humpbacked bridge, there is a danger that the trailer will become detached. Drivers should also plan and carry out their journey with an awareness of this risk."
    },
    {
      "id": 308,
      "content": "A driver has stalled in the middle of an unguarded level crossing and cannot restart the engine. The warning bell is ringing. What should the driver do?",
      "labels": [3],
      "options": [
        "Push the vehicle clear of the crossing.",
        "Try to restart the engine in first gear.",
        "Walk clear of the crossing and phone the signal operator so that trains can be stopped.",
        "Stay at the vehicle and warn the approaching train."
      ],
      "correct": 3,
      "answerContent": "In this situation, the driver and all passengers should get out of the vehicle and immediately use the emergency phone at the crossing to contact the signal operator so that trains can be stopped. If necessary, warn other motorists. Do not return to the vehicle until instructed by the signal operator or emergency services."
    },
    {
      "id": 309,
      "content": "What should a driver do if their vehicle breaks down on an automatic railway level crossing?",
      "labels": [3],
      "options": [
        "Try to push the vehicle clear of the crossing as soon as possible.",
        "Get passengers clear of the crossing and phone the signal operator so that trains can be stopped.",
        "Turn on the warning bells at the crossing.",
        "Walk along the track to give warning to any approaching trains."
      ],
      "correct": 2,
      "answerContent": "In this situation, you and all passengers should get out of the vehicle and immediately use the emergency phone at the crossing to contact the signal operator so that trains can be stopped. If necessary, warn other motorists. Do not return to the vehicle until instructed by the signal operator or emergency services."
    },
    {
      "id": 310,
      "content": "What is the immediate effect of a head-on collision between two cars at speed?",
      "labels": [3],
      "options": [
        "All persons in each vehicle are thrown violently backwards only.",
        "Only front seatbelts will activate.",
        "Only rear seatbelts will activate.",
        "All persons in each vehicle are thrown violently forward."
      ],
      "correct": 4,
      "answerContent": "In a head-on collision passengers in both vehicles are propelled forwards, and if they are not wearing seatbelts they may go through the windscreen. It is the drivers responsibility to ensure that all passengers under the age of 17 wear seatbelts. Older passengers are themselves responsible for wearing seatbelts."
    },
    {
      "id": 311,
      "content": "When attaching a trailer to their vehicle, what must a driver check?",
      "labels": [3],
      "options": [
        "That the load is positioned to the front of the trailer.",
        "That the load is positioned to the rear of the trailer.",
        "That the load is evenly spread.",
        "That the trailer has a spare wheel."
      ],
      "correct": 3,
      "answerContent": "Proper weight distribution helps to ensure the stability of both the towing vehicle and the trailer. In the trailer, the bulk of the load should be over the axles. If a heavy load is positioned at the front of the trailer, this will result in too much nose weight on the hitch of the towing vehicle and make it difficult to steer. If a heavy load is positioned at the rear of the trailer, this will result in reduced weight on the rear axle of the towing vehicle, which will make it more unstable."
    },
    {
      "id": 312,
      "content": "When attaching a trailer to their vehicle, what must a driver check?",
      "labels": [3],
      "options": [
        "That the trailer springs are well greased.",
        "That the trailer coupling is attached securely.",
        "That the trailer has a spare wheel.",
        "That the load is positioned to the front of the trailer."
      ],
      "correct": 2,
      "answerContent": "Before towing a trailer or a caravan, check that the tow bar is securely attached to the towing vehicle, that the trailer coupling is properly attached to the tow bar and locked in place, and that the breakaway cable is properly connected."
    },
    {
      "id": 313,
      "content": "What effect do the hazard warning lights have on the brake lights?",
      "labels": [3],
      "options": [
        "They cause the brake lights to switch off completely.",
        "They cause the brake lights to flash repeatedly.",
        "They cause the left and right brake lights to flash alternately.",
        "They have no effect."
      ],
      "correct": 4,
      "answerContent": "The hazard lights work independently of the other lights on the vehicle (except the direction indicators), and have no effect on the brake lights. Use the hazard warning lights to warn other road users of a danger ahead, when your vehicle is broken down and causing an obstruction, or when you needs to slow down sharply on a motorway."
    },
    {
      "id": 314,
      "content": "When should a driver use their hazard warning lights?",
      "labels": [3],
      "options": [
        "When the vehicle has broken down.",
        "When the brake lights are not working.",
        "When parking for a short time on a single yellow line.",
        "When about to pull in and stop."
      ],
      "correct": 1,
      "answerContent": "Use the hazard warning lights to warn other road users of a danger ahead. For example, if a drivers vehicle has broken down and is stopped on the hard shoulder, they should use the vehicles hazard warning lights to warn other road users of their presence."
    },
    {
      "id": 315,
      "content": "When should a driver use their vehicle's hazard warning lights?",
      "labels": [3],
      "options": [
        "When double parking.",
        "When causing an unavoidable obstruction.",
        "When the brake lights are not working.",
        "When a following vehicle is too close."
      ],
      "correct": 2,
      "answerContent": "Use the hazard warning lights to warn other road users of a danger ahead. For example, if a drivers vehicle is causing an unavoidable obstruction such as being broken down, they should use the vehicles hazard warning lights to warn other road users of their presence."
    },
    {
      "id": 316,
      "content": "When should a driver use their vehicle's hazard warning lights?",
      "labels": [3],
      "options": [
        "When parked at a bend or corner.",
        "When reversing onto a narrow road.",
        "When broken down and causing an obstruction.",
        "When moving slowly in traffic."
      ],
      "correct": 3,
      "answerContent": "Use the hazard warning lights to warn other road users of a danger ahead. For example, if a drivers vehicle is causing an unavoidable obstruction such as being broken down, they should use the vehicles hazard warning lights to warn other road users of their presence."
    },
    {
      "id": 317,
      "content": "What lighting must be on a two-axle car-trailer?",
      "labels": [3],
      "options": [
        "Indicators, brake lights, rear number plate light, red reflectors and rear tail lights.",
        "Flashing rear tail lights.",
        "Indicators and rear number plate lights only.",
        "Brake lights and indicators only."
      ],
      "correct": 1,
      "answerContent": "All vehicles, including trailers, must have rear indicators, brake lights, a rear number plate light, red reflectors and rear tail lights."
    },
    {
      "id": 318,
      "content": "What lighting must be on a tractors trailer during lighting-up hours?",
      "labels": [3],
      "options": [
        "An unloading light.",
        "Brake lights and indicators only.",
        "Indicators, brake lights, rear number plate light, red reflectors and rear tail lights.",
        "Indicators, two white or yellow headlamps and rear number plate lights only."
      ],
      "correct": 3,
      "answerContent": "A trailer being towed by a tractor must have rear indicators, brake lights, a rear number plate light, red reflectors and rear tail lights whilst being towed on a public road."
    },
    {
      "id": 319,
      "content": "What should a driver do to reduce the risk of neck injury in the event of a rear-end collision?",
      "labels": [3],
      "options": [
        "Use a properly adjusted head restraint.",
        "Ensure the vehicle has a rear spoiler.",
        "Ensure the vehicle has anti-lock brakes.",
        "Use a properly adjusted seat belt."
      ],
      "correct": 1,
      "answerContent": "It is essential that head restraints be properly adjusted for both the driver and the passengers. Head restraints are designed to protect the neck and spine in a collision and thus prevent or reduce whiplash. If head restraints are not properly adjusted there is an increased risk to the vehicles occupants."
    },
    {
      "id": 320,
      "content": "A driver notices that the wiper blades are worn. What should they do?",
      "labels": [3],
      "options": [
        "Roll down the window and drive slowly.",
        "Have the blades replaced as soon as possible.",
        "Use the windscreen washer system while it is raining.",
        "Wipe the windscreen with newspaper."
      ],
      "correct": 2,
      "answerContent": "Use the windscreen wipers to keep the windscreen clear of rain, spray, snow or fog. Check them regularly to ensure that they are in good working order, and replace them when they become worn, before they become ineffective."
    },
    {
      "id": 321,
      "content": "When a wiper blade fails to clear the windscreen what should the driver do?",
      "labels": [3],
      "options": [
        "Apply a light film of oil to both of the wiper blades.",
        "Bend the wiper arm to apply more pressure on the windscreen.",
        "Have the wiper blades replaced as soon as possible.",
        "Switch the wiper control from high speed to low speed repeatedly."
      ],
      "correct": 3,
      "answerContent": "Use the windscreen wipers to keep the windscreen clear of rain, spray, snow or fog. Check them regularly to ensure that they are in good working order, and replace them when they become worn, before they become ineffective."
    },
    {
      "id": 322,
      "content": "If a vehicle breaks down on a motorway, what should a person do?",
      "labels": [3],
      "options": [
        "Use a roadside phone to contact Garda\xED and never try to carry out repairs yourself.",
        "Place a red warning triangle on the motorway to warn other drivers.",
        "Ask a passenger to stand on the road to warn other traffic.",
        "Turn on the full beam headlights to alert other drivers."
      ],
      "correct": 1,
      "answerContent": "When a vehicle breaks down on a motorway, a driver should move the vehicle to the hard shoulder, use the roadside phone to contact the Garda\xED, and do not place a warning device on the motorway. The driver should never try to do repairs themselves in the hard shoulder."
    },
    {
      "id": 323,
      "content": "Where safety belts are fitted to a car when must adult occupants wear them?",
      "labels": [3],
      "options": [
        "Only on journeys outside built-up areas.",
        "At all times.",
        "Only on journeys exceeding 10\xA0kilometres.",
        "Only on long journeys."
      ],
      "correct": 2,
      "answerContent": "The driver and all passengers in a car must wear a safety belt or, in the case of a child, a suitable restraint system."
    },
    {
      "id": 324,
      "content": "Who is responsible for ensuring that a passenger over 17\xA0years of age is wearing a seat belt while travelling in a car?",
      "labels": [3],
      "options": [
        "The driver when the passenger is in the front seat.",
        "The passenger only.",
        "Both the driver and the passenger.",
        "The driver only."
      ],
      "correct": 2,
      "answerContent": "Where the passenger is over the age of 17 and travelling in a car it is their legal responsibility to comply with the seat belt regulations. Below that age, it is the drivers responsibility."
    },
    {
      "id": 325,
      "content": "Who is responsible for ensuring that a passenger under 17\xA0years of age is wearing a seat belt while travelling in a car?",
      "labels": [3],
      "options": [
        "The driver only.",
        "The driver, but only when the passenger is in the front seat.",
        "The passenger only.",
        "The passenger's parents."
      ],
      "correct": 1,
      "answerContent": "Where the passenger is over the age of 17 and travelling in a car it is their legal responsibility to comply with the seat belt regulations. Below that age, it is the drivers responsibility."
    },
    {
      "id": 326,
      "content": "Who is responsible for ensuring that a child wears a child restraint system in a vehicle?",
      "labels": [3],
      "options": [
        "The child, if over 12\xA0years of age.",
        "Any adult passenger.",
        "The driver only.",
        "The parents of the child only."
      ],
      "correct": 3,
      "answerContent": "Where the passenger is over the age of 17 and travelling in a car it is their legal responsibility to comply with the child restraint regulations. Below that age, it is the drivers responsibility."
    },
    {
      "id": 327,
      "content": "In general, how should children under 3\xA0years of age be secured in a vehicle?",
      "labels": [3],
      "options": [
        "They should always be secured in the correct child seat.",
        "They should always sit on the rear passenger seat.",
        "They should always be placed in the front passenger seat wearing a seat belt.",
        "They should always be carried in an adult's lap."
      ],
      "correct": 1,
      "answerContent": "Safety belts are designed mainly for adults and older children. Children under 3\xA0years of age must be restrained in an appropriate child restraint system. Warning; Never use a rearward facing child car seat in a seat protected by an active frontal airbag."
    },
    {
      "id": 328,
      "content": "Can a child under the age of 3\xA0years be carried unrestrained in the vehicle's front passenger seat.",
      "labels": [3],
      "options": [
        "No, unless the child is using a child booster seat.",
        "Yes, provided the infant is held securely by an adult.",
        "Yes, but only if the vehicle is fitted with active airbags.",
        "No, an infant must always be restrained in the correct child seat."
      ],
      "correct": 4,
      "answerContent": "Generally, children must never travel unrestrained in a vehicle. Children under 3\xA0years of age must be restrained in an appropriate child restraint system. Warning; Never use a rearward facing child car seat in a seat protected by an active frontal airbag."
    },
    {
      "id": 329,
      "content": "How should a child restraint system be fitted in a vehicle?",
      "labels": [3],
      "options": [
        "It should be placed on the floor.",
        "It should be fitted in accordance with the manufacturers instructions.",
        "It should be left unsecured.",
        "It should be placed on a front passenger seat only."
      ],
      "correct": 2,
      "answerContent": "It is recommended to fit the child seat correctly, according to the manufacturers instructions, it is safer to fit the seat in the back seat of the car and to buy a child car seat only from a retailer who will check that it fits both the car and the child."
    },
    {
      "id": 330,
      "content": "On a motorway, when should a driver use the hazard warning lights?",
      "labels": [3],
      "options": [
        "When the vehicle has broken down.",
        "When parked in the hard shoulder to take a phone call.",
        "When another vehicle is following too closely.",
        "When towing another vehicle."
      ],
      "correct": 1,
      "answerContent": "Use the hazard warning lights to warn other road users of a danger ahead. For example, if your vehicle has broken down and is stopped on the hard shoulder, you can use the hazard warning lights to warn following vehicles of your presence."
    },
    {
      "id": 331,
      "content": "If a vehicle breaks down on a motorway, what should a person do?",
      "labels": [3],
      "options": [
        "Move the vehicle to the hard shoulder.",
        "Place a red warning triangle to the left of the vehicle.",
        "Ask a passenger to stand on the motorway to warn other traffic.",
        "Turn on the full beam headlights."
      ],
      "correct": 1,
      "answerContent": "Move the vehicle to the hard shoulder. Park as near to the left as possible. If this is not possible, take steps to warn other drivers, such as switching on the hazard warning lights."
    },
    {
      "id": 332,
      "content": "If a vehicle breaks down on a motorway, what should a person do?",
      "labels": [3],
      "options": [
        "Wear a high visibility vest.",
        "Turn on the full beam headlights.",
        "Place a red warning triangle to the left of the vehicle.",
        "Ask a passenger to stand on the motorway to warn other traffic."
      ],
      "correct": 1,
      "answerContent": "Move the vehicle to the hard shoulder. Park as near to the left as possible. If this is not possible, take steps to warn other drivers, such as switching on the hazard warning lights. Wear a high visibility vest. Always carry at least two in the vehicle."
    },
    {
      "id": 333,
      "content": "If a vehicle breaks down, where should the driver stop?",
      "labels": [3],
      "options": [
        "The nearest exit ramp.",
        "In the lane where the problem occurred.",
        "As far to the left as possible.",
        "As far to the right as possible."
      ],
      "correct": 3,
      "answerContent": "When a vehicle breaks down it is important to move as far in to the left as possible for the convenience of other road users and the safety of the vehicles occupants"
    },
    {
      "id": 334,
      "content": "What is the quickest way to warn other traffic of a crash?",
      "labels": [3],
      "options": [
        "Use hazard lights.",
        "Place a large object in the centre of the road.",
        "Call local radio station.",
        "Stand in the road and wave arms."
      ],
      "correct": 1,
      "answerContent": "If you arrive at the scene of a crash, find a safe place to stop so that you don't endanger yourself or others, warn other road users of the incident by using hazard lights."
    },
    {
      "id": 335,
      "content": "In order to inform the emergency services of a crash what telephone number should be called?",
      "labels": [3],
      "options": [
        "112",
        "555",
        "199",
        "911"
      ],
      "correct": 1,
      "answerContent": "If a driver arrives at or is involved in a crash it may be essential to obtain the assistance of the emergency services as a matter of urgency. The common European emergency number is 112 however in Ireland you may also use 999."
    },
    {
      "id": 336,
      "content": "When calling for help on an emergency telephone on the motorway, who does the call go to?",
      "labels": [3],
      "options": [
        "National Safety Council.",
        "Road Safety Authority.",
        "National Roads Authority.",
        "The Garda\xED."
      ],
      "correct": 4,
      "answerContent": "The emergency telephones at the side of a motorway are linked directly to An Garda S\xEDoch\xE1na in order for them to respond appropriately as soon as possible. The Garda\xED know precisely the location of each call using these phones."
    },
    {
      "id": 337,
      "content": "Where an injured person is discovered lying in the road, when should they be moved?",
      "labels": [3],
      "options": [
        "If the person has broken bones.",
        "If the person needs CPR.",
        "If the person is bleeding.",
        "If the person is cold."
      ],
      "correct": 2,
      "answerContent": "If a person discovered lying in the road is not breathing, it may be essential to move them in order to safely carry out emergency CPR. It may also be necessary to move them under other circumstances but an urgent assessment of the situation should be carried out first."
    },
    {
      "id": 338,
      "content": "When dealing with crash victims, remember A B C. What does A stand for?",
      "labels": [3],
      "options": [
        "Accident.",
        "Arms.",
        "Assist.",
        "Airway."
      ],
      "correct": 4,
      "answerContent": "In assessing a crash victims vital signs the following basic procedure should be used First check the victims Airway is clear, then check they are Breathing and then check their Circulation (ABC)"
    },
    {
      "id": 339,
      "content": "When dealing with crash victims, remember A B C. What does C stand for?",
      "labels": [3],
      "options": [
        "Cough.",
        "Coma.",
        "Coronary.",
        "Circulation."
      ],
      "correct": 4,
      "answerContent": "In assessing a crash victims vital signs, the following basic procedure should be used: First check the victims Airway is clear, then check they are Breathing and then check their Circulation (ABC)"
    },
    {
      "id": 340,
      "content": "What is good basic first aid for a person who has been burned?",
      "labels": [3],
      "options": [
        "Apply grease to the burn.",
        "Apply cold water to the burn.",
        "Remove clothing covering the burn.",
        "Apply warm water to the burn."
      ],
      "correct": 2,
      "answerContent": "When a person has been burned firstly check the person for shock, then try to cool the burn if you can. Try to find water or other liquid that is clean, cold and non-toxic to pour on it. The cool liquid may cool the affected area down and reduce damage. The person should be advised to seek medical advice as soon as possible."
    },
    {
      "id": 341,
      "content": "What effect could hitting or mounting the kerb have on a vehicle's tyres?",
      "labels": [3],
      "options": [
        "It could wear the tread.",
        "It could increase the air pressure.",
        "It could damage the sidewalls.",
        "It could strengthen the sidewalls."
      ],
      "correct": 3,
      "answerContent": "Drivers should avoid hitting or mounting the kerb as it causes damage to the sidewalls of the tyre. The damage caused could cause the tyre to blow-out later. If this happens at high speed the driver may lose control of the vehicle with dangerous consequences."
    },
    {
      "id": 342,
      "content": "What does this light mean?",
      "labels": [3],
      "options": [
        "The oil level is too low.",
        "The battery is not charging.",
        "The gear box is over-heating.",
        "The engine is over-heating."
      ],
      "correct": 2,
      "answerContent": "If the battery warning light comes on whilst driving, it means there is some kind of problem with the electrical charging system of the vehicle and the battery is not being charged properly. The driver should get this checked by a professional as soon as possible. It is important to understand the meaning of your vehicles warning lights, information on which can be found in the vehicles handbook.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_PHcHC.png",
      "img_name": "card 342.png"
    },
    {
      "id": 343,
      "content": "What does this light mean?",
      "labels": [3],
      "options": [
        "The high-beam headlights are switched on.",
        "The reversing light is switched on.",
        "The number plate light is faulty.",
        "The headlight beam should be dipped."
      ],
      "correct": 1,
      "answerContent": "All vehicles are fitted with warning lights to alert the driver to different things. This light comes on when the full beam headlights are turned on. It is important to understand the meaning of your vehicles warning lights, information on which can be found in the vehicles handbook.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_IpaGp.png",
      "img_name": "card 343.png"
    },
    {
      "id": 344,
      "content": "What does this light mean?",
      "labels": [3],
      "options": [
        "Low engine coolant level.",
        "Low engine oil level.",
        "Low battery fluid level.",
        "Low brake fluid level."
      ],
      "correct": 2,
      "answerContent": "If the engine oil warning light comes on, it means that the engine oil level/pressure has dropped. You should not drive the vehicle until the problem is fixed. If the light comes on while driving, pull over and stop in a safe place as soon as possible. It is important to understand the meaning of your vehicles warning lights, information on which can be found in the vehicles handbook.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_YmMBQ.png",
      "img_name": "card 344.png"
    },
    {
      "id": 345,
      "content": "What does this light mean?",
      "labels": [3],
      "options": [
        "Headlight bulb blown.",
        "Directional indicator on.",
        "Brake light bulb blown.",
        "Right-hand fog light on."
      ],
      "correct": 2,
      "answerContent": "All vehicles are fitted with warning lights to alert you to different things. This light tells you that the directional indicator is on. If this light is still on after you have completed your manoeuvre, cancel it to avoid misleading other road users. It is important to understand the meaning of your vehicles warning lights, information on which can be found in the vehicles handbook.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_wlpn9.png",
      "img_name": "card 345.png"
    },
    {
      "id": 346,
      "content": "What should the driver do when there is a sharp dip in the road ahead?",
      "labels": [4],
      "options": [
        "Reduce speed, keep to the left and be alert for hazards ahead.",
        "Increase speed and make progress through the dip.",
        "Pull in, stop and switch on hazard warning lights.",
        "Move to the centre of the road in order to avoid any vehicles that might be parked on the left."
      ],
      "correct": 1,
      "answerContent": "As you approach a sharp dip in the road, you should be aware that there might be hidden dangers ahead. For example, there might be pedestrians, cyclists or other approaching traffic, or the road could be flooded in the dip. You should always read the road ahead and be prepared to react to changing traffic situations ? you might need to reduce your speed and drive with extra care."
    },
    {
      "id": 347,
      "content": "The driver is approaching traffic lights that they know have been green for some time. What should the driver do?",
      "labels": [4],
      "options": [
        "The driver should be aware that the lights may change before they reach them and be prepared to stop.",
        "The driver should maintain speed until the light changes to amber.",
        "The driver should stop as the lights are about to change to red.",
        "The driver should be aware that the lights may change and accelerate to clear the lights before they do."
      ],
      "correct": 1,
      "answerContent": "You should always read the road ahead and be prepared to react to changing traffic situations. Where traffic lights have been green for some time, you should be prepared to stop, as the lights are probably about to change to amber."
    },
    {
      "id": 348,
      "content": "What should a driver do when approaching a junction normally controlled by traffic lights and the traffic lights are not lighting?",
      "labels": [4],
      "options": [
        "Proceed smartly through the junction to avoid delay.",
        "Treat it as an unmarked junction and proceed cautiously while watching out for other traffic.",
        "Switch on headlights, move to centre of the junction and proceed as quickly as possible.",
        "Stop at the junction and give way to traffic on the left."
      ],
      "correct": 2,
      "answerContent": "You should always read the road ahead and be prepared to react to changing traffic situations. If the traffic lights are not working, you should approach the junction with extra care, and you should proceed only if it is safe to do so."
    },
    {
      "id": 349,
      "content": "What should the driver do if there are cattle on the road ahead?",
      "labels": [4],
      "options": [
        "The driver should sound the horn, switch on headlights, reduce speed and pass with care.",
        "The driver should reduce speed and pass them with care.",
        "The driver should switch on the headlights and try to pass as quickly as possible.",
        "The driver should sound the horn to try to get the cattle to move aside."
      ],
      "correct": 2,
      "answerContent": "You should always read the road ahead and be prepared to react to changing traffic situations. If you meet cattle or other animals on the road, you should slow down and be prepared to stop. Don't use the horn or do anything that might frighten the animals. You must stop if directed to do so by the person in charge of animals."
    },
    {
      "id": 350,
      "content": "What should a driver do if they see horse riders on the road ahead?",
      "labels": [4],
      "options": [
        "The driver should turn on hazard warning lights and continue at normal speed.",
        "The driver should increase speed and allow extra clearance.",
        "The driver should reduce speed, allow extra clearance and pass with care.",
        "The driver should reduce speed and sound the horn."
      ],
      "correct": 3,
      "answerContent": "You should always read the road ahead and be prepared to react to changing traffic situations. If you meet horses or other animals on the road, you should slow down and be prepared to stop. Don't use the horn or do anything that might frighten the animals. You must stop if directed to do so by the person in charge of animals."
    },
    {
      "id": 351,
      "content": "What should the driver do when approaching a humpbacked hill?",
      "labels": [4],
      "options": [
        "The driver should move to the centre in order to avoid vehicles that may be parked on the left.",
        "The driver should maintain normal speed and road position.",
        "The driver should reduce speed, keep to the left and be alert for hazards ahead.",
        "The driver should increase speed and make progress over the humpbacked hill."
      ],
      "correct": 3,
      "answerContent": "As you approach a humpbacked bridge or hill, you should be aware that there might be hidden dangers ahead ? for example, overtaking traffic coming towards you. You should always read the road ahead and be prepared to react to changing traffic situations such as this."
    },
    {
      "id": 352,
      "content": "What do flashing amber beacons on an oncoming vehicle alert a driver to?",
      "labels": [4],
      "options": [
        "That the oncoming vehicle may be slow moving or extra wide.",
        "That the oncoming vehicle is fast moving.",
        "That the oncoming vehicle is an emergency vehicle.",
        "That the oncoming vehicle is a military vehicle."
      ],
      "correct": 1,
      "answerContent": "Flashing amber beacons are used by recovery vehicles and vehicles carrying abnormal loads. You should be aware that these vehicles may need extra room and could conceal following traffic. When you come across such vehicles, slow down and be prepared to stop if necessary."
    },
    {
      "id": 353,
      "content": "What should a driver do if they meet a vehicle with flashing amber beacons?",
      "labels": [4],
      "options": [
        "Stop because it is an emergency vehicle.",
        "Increase speed while keeping left.",
        "Flash their headlights to acknowledge the beacons.",
        "Slow down and prepare to stop."
      ],
      "correct": 4,
      "answerContent": "Flashing amber beacons are used by recovery vehicles and vehicles carrying abnormal loads. You should be aware that these vehicles may need extra room and could conceal following traffic. When you come across such vehicles, slow down and be prepared to stop if necessary."
    },
    {
      "id": 354,
      "content": "What should a driver be aware of before crossing railway or tram lines?",
      "labels": [4],
      "options": [
        "There may be a reduction in tyre noise while crossing the rails.",
        "The wheels may become caught in the rails, causing the tyres to deflate.",
        "The tyre grip may be improved crossing the rails.",
        "There may be an uneven surface and tyre grip may be reduced when crossing the rails."
      ],
      "correct": 4,
      "answerContent": "You should be aware of the impact of changes in the road surface. For example, at railway and tram crossings the uneven surface or oil deposits could reduce the grip of your tyres. Slow down as you approach railway or tram crossings and increase your distance from the vehicle in front."
    },
    {
      "id": 355,
      "content": "What should the driver be aware of when crossing road markings such as lines and directional arrows in wet weather?",
      "labels": [4],
      "options": [
        "The tyre grip is improved.",
        "Steering control is improved.",
        "The required stopping distance is reduced due to improved tyre grip.",
        "The required stopping distance is increased due to reduced tyre grip."
      ],
      "correct": 4,
      "answerContent": "You should be aware of the impact of changes in the road surface. For example, road markings and directional arrows can become slippery when wet. Where possible, avoid driving on road markings, and be aware of the increased risk of skidding."
    },
    {
      "id": 356,
      "content": "What should a driver do on a narrow road when another vehicle is coming in the opposite direction?",
      "labels": [4],
      "options": [
        "Maintain position and expect the other vehicle to move over.",
        "Position your vehicle along the middle of the road to encourage the other driver to pull in.",
        "Reduce speed and allow reasonable clearance between their vehicle and the oncoming one before proceeding.",
        "Maintain road position and speed. Then flash the vehicles lights to alert the other driver to your presence."
      ],
      "correct": 3,
      "answerContent": "You should always be prepared to react to hazards ahead. When you meet a vehicle coming against you on a narrow road, you should show consideration and slow down to a appropriate speed so that the two vehicles can pass each other safely."
    },
    {
      "id": 357,
      "content": "When a driver is driving behind another vehicle that they do not intend to overtake, what should the driver do?",
      "labels": [4],
      "options": [
        "Drive close behind it in order to let following traffic overtake both vehicles.",
        "Signal to following traffic to overtake both vehicles.",
        "Keep well back and to the centre of the road.",
        "Keep well back to allow following traffic to overtake."
      ],
      "correct": 4,
      "answerContent": "You should always allow sufficient distance between your vehicle and the vehicle in front. This will enable you to stop safely (within the distance you can see clear). It will also give overtaking vehicles enough room to pull in safely to the left lane after they have passed you."
    },
    {
      "id": 358,
      "content": "When a driver is driving in a line of traffic and does not intend to overtake, what should the driver do?",
      "labels": [4],
      "options": [
        "Stay back and leave a gap for other drivers to overtake.",
        "Indicate left as a signal to following traffic to overtake.",
        "Drive close to the vehicle in front.",
        "Beckon to following traffic to overtake."
      ],
      "correct": 1,
      "answerContent": "You should always allow sufficient distance between your vehicle and the vehicle in front. This will enable you to stop safely (within the distance you can see clear). It will also give overtaking vehicles enough room to pull in safely to the left lane after they have passed you."
    },
    {
      "id": 359,
      "content": "Why is tailgating (driving too close behind the vehicle in front) dangerous?",
      "labels": [4],
      "options": [
        "The braking system is less efficient in the slipstream of the vehicle in front.",
        "The engine may overheat because of restricted air flow over the vehicle's engine.",
        "The vehicle will not have sufficient distance to stop safely in an emergency.",
        "The vehicle will exceed the speed limit."
      ],
      "correct": 3,
      "answerContent": "If you drive too close to the vehicle in front and it brakes suddenly, you will not have enough time to react. For that reason you should always keep a safe distance from the vehicle in front. One way of calculating a safe distance in dry weather is the two-second rule: allow at least two seconds to elapse between the vehicle in front and your own vehicle passing a fixed point such as a lamp post or sign post."
    },
    {
      "id": 360,
      "content": "Is tailgating allowed on a motorway or dual carriageway?",
      "labels": [4],
      "options": [
        "Yes, because there is oncoming traffic.",
        "Yes, because all traffic moves in the one direction at the same time.",
        "No, because the vehicle in front may stop suddenly.",
        "No, because other vehicles do not have room to overtake."
      ],
      "correct": 3,
      "answerContent": "If you drive too close to the vehicle in front and it brakes suddenly, you will not have enough time to react. For that reason you should always keep a safe distance from the vehicle in front. One way of calculating a safe distance in dry weather is the two-second rule: allow at least two seconds to elapse between the vehicle in front and your own vehicle passing a fixed point such as a lamp post or sign post."
    },
    {
      "id": 361,
      "content": "What danger can arise during daylight when a driver enters an area that is heavily shaded by overhanging trees?",
      "labels": [4],
      "options": [
        "Visibility could suddenly be reduced.",
        "The vehicle engine could suddenly run cold.",
        "The vehicle's windscreen could fog up.",
        "The tyre pressure could be reduced."
      ],
      "correct": 1,
      "answerContent": "When you enter a heavily shaded area after driving in bright sunlight, it might take a while for your eyes to adjust to the change, and you might not see a hazard immediately ahead."
    },
    {
      "id": 362,
      "content": "When driving into a narrow gap between oncoming vehicles and vehicles parked on the left. What should a driver do?",
      "labels": [4],
      "options": [
        "Indicate right, stopping if necessary until oncoming traffic has passed by.",
        "Indicate and drive on enforcing your priority.",
        "Signal to oncoming traffic to stop, and then move to the right and drive as normal.",
        "Always slow down, stop and wait to be beckoned forward."
      ],
      "correct": 1,
      "answerContent": "When you meet approaching traffic at a narrow gap, you should show consideration and slow down to an appropriate speed so that you and the other vehicles can pass each other safely. If necessary, give way to the other vehicles."
    },
    {
      "id": 363,
      "content": "How does giving a late signal affect other road users?",
      "labels": [4],
      "options": [
        "They are not affected.",
        "It only affects other road users at traffic lights.",
        "They may not have been given sufficient time to react.",
        "It only affects other road users at roundabouts."
      ],
      "correct": 3,
      "answerContent": "Giving signals is a way of telling other road users what you intend to do. So, you should signal properly before moving off, turning right or left, changing lanes, overtaking, slowing down or stopping. Signal clearly and in good time, and keep in mind that giving a signal does not give you the right of way. Late signals may confuse other road users."
    },
    {
      "id": 364,
      "content": "What should a driver do when approaching traffic lights stuck on red?",
      "labels": [4],
      "options": [
        "Sound the horn and proceed ahead.",
        "Stop and proceed with great caution.",
        "Indicate and increase speed.",
        "Check that there are no oncoming vehicles and increase speed."
      ],
      "correct": 2,
      "answerContent": "On approach to traffic lights that are stuck on red, a driver should stop and proceed with caution when the way is clear."
    },
    {
      "id": 365,
      "content": "What should a driver do when there are dark clouds and visibility is reduced during daylight hours?",
      "labels": [4],
      "options": [
        "Drive with main beam headlights switched on.",
        "Driver should not switch on lights until lighting up hours.",
        "Drive with dipped headlights switched on.",
        "Keep close to any vehicle in front with headlights off."
      ],
      "correct": 3,
      "answerContent": "Drivers need to see and be seen during all periods of low light levels ? for example, at dusk and dawn and in some bad weather conditions. At times of low light, you should turn on dipped headlights."
    },
    {
      "id": 366,
      "content": "When driving behind a heavy goods vehicle that is signalling to turn right, what should a driver do?",
      "labels": [4],
      "options": [
        "Overtake it slowly on the inside by driving partly on the footpath if necessary.",
        "Sound the horn and overtake the heavy goods vehicle on the right.",
        "Stay behind until there is sufficient space to overtake it on the inside or until it has completed the turn.",
        "See if the vehicle can complete the turn without stopping, and if not, overtake it yourself."
      ],
      "correct": 3,
      "answerContent": "Heavy goods vehicles need extra space on the road, and when they are turning the overhang of the vehicle may swing out into the path of overtaking or passing traffic. For that reason, it is a good idea to stay back and let the heavy goods vehicle complete its turn unless there is sufficient space to overtake safely."
    },
    {
      "id": 367,
      "content": "When driving behind a bus that is signalling to turn left and there is oncoming traffic, what should a driver do?",
      "labels": [4],
      "options": [
        "Stay back and allow it to complete the turn.",
        "Tap the brakes and sound the horn to signal to other vehicles to slow down.",
        "Overtake it on the right-hand side.",
        "Overtake it on the left-hand side."
      ],
      "correct": 1,
      "answerContent": "Always allow a bus to complete a left-hand turn, because your field of view is restricted, and it could be dangerous to attempt overtaking it."
    },
    {
      "id": 368,
      "content": "Where are the blind spots that a driver needs to be aware of when towing a loaded trailer?",
      "labels": [4],
      "options": [
        "The area to the side and rear of the vehicle and the trailer that the driver cannot see.",
        "Parts of the road ahead which are obscured by other large vehicles.",
        "The goods or cargo area on the back of the trailer.",
        "The view to the front hidden by the sun-visor."
      ],
      "correct": 1,
      "answerContent": "A blind spot is an area that a driver cannot see when looking forward or when looking in the mirrors. You should check your blind spots before changing direction or changing lane. The bigger the vehicle, the bigger the blind spots, and you should keep this in mind if you are driving behind a large vehicle, such as one towing a loaded trailer. In this situation, if you cannot see the towing vehicles mirror, then the driver of that vehicle cannot see you."
    },
    {
      "id": 369,
      "content": "What should a driver do when driving on a wide road behind a vehicle that has signalled to turn right ahead?",
      "labels": [4],
      "options": [
        "Overtake on the left, but only if turning left a short distance ahead.",
        "Stay behind and tap the brakes to signal other drivers to slow down.",
        "Overtake on the left-hand side and carry on if safe to do so.",
        "Overtake on the right-hand side and carry on."
      ],
      "correct": 3,
      "answerContent": "You may overtake on the left when the driver in front has moved out and signalled their intent to turn right and you intend to go straight ahead ? provided there is enough room to do so safely and your path will not be obstructed by the swing of a large vehicle turning right."
    },
    {
      "id": 370,
      "content": "When is it permissible to overtake another vehicle on the nearside (left-hand side)?",
      "labels": [4],
      "options": [
        "Only when there is no cycle lane.",
        "When there are three lanes available in fast moving traffic.",
        "When the vehicle in front is signalling to turn right.",
        "A driver must never overtake on the left."
      ],
      "correct": 3,
      "answerContent": "You may overtake on the left when the driver in front has moved out and signalled their intent to turn right and you intend to go straight ahead ? provided there is enough room to do so safely and your path will not be obstructed by the swing of a large vehicle turning right."
    },
    {
      "id": 371,
      "content": "What should a driver who wishes to perform a U-turn do?",
      "labels": [4],
      "options": [
        "Check ahead for approaching traffic and signal them to stop.",
        "Check that the road is not one way.",
        "Check behind for approaching traffic and signal them to stop.",
        "Only perform a U-turn outside the urban speed limit area."
      ],
      "correct": 2,
      "answerContent": "If you want to do a U-turn you must first choose a place where it is safe and legal to do it. Check all around for other road users and do not impede their right of way. Complete the manoeuvre efficiently and safely."
    },
    {
      "id": 372,
      "content": "What should a driver who wishes to perform a turnabout do?",
      "labels": [4],
      "options": [
        "Check ahead and behind for oncoming traffic and turn briskly while still keeping a look out.",
        "Drive into somebody's driveway and reverse back onto the road.",
        "It is not permissible to perform a turnabout in any circumstance.",
        "Drive onto a footpath if necessary in order to ensure that they have sufficient room to turn."
      ],
      "correct": 1,
      "answerContent": "If you want to do a turnabout, you must first choose a place where it is safe and legal to do so. Check all around for other road users and do not impede their right of way. Complete the manoeuvre efficiently and safely."
    },
    {
      "id": 373,
      "content": "What should a driver do if they are not travelling as fast as the vehicle in front?",
      "labels": [4],
      "options": [
        "The driver should switch on hazard warning lights and keep to the left.",
        "The driver should keep to the left and allow vehicles to overtake if they wish.",
        "The driver should invite traffic to overtake them by giving a hand signal.",
        "The driver should keep their position and not allow following vehicles to overtake."
      ],
      "correct": 2,
      "answerContent": "Always read the road ahead and be prepared to react to any traffic situation. You should not drive so slowly that your vehicle unnecessarily blocks other road users. Keep as near to the left as is safe to allow other vehicles to pass safely if they wish."
    },
    {
      "id": 374,
      "content": "What should a driver do if they wish to drive across a busy road and the traffic lights which normally control the junction are temporarily out of action?",
      "labels": [4],
      "options": [
        "Sound the horn and proceed slowly to cross the road.",
        "Take good observation, wait for a clear break in the traffic and proceed to cross the road safely.",
        "Slowly force their way across using hazard warning lights if necessary.",
        "Switch on headlights and use hand signals to show other drivers their intention to cross and then proceed."
      ],
      "correct": 2,
      "answerContent": "Always read the road ahead and be prepared to react to any traffic situation. In this case, do not proceed until it is clear and safe to do so. Do not assume that you have the right of way."
    },
    {
      "id": 375,
      "content": "What should a driver do if they see a school bus stopped on the nearside (left side) of the road ahead?",
      "labels": [4],
      "options": [
        "Signal and maintain current speed.",
        "Switch on hazard warning lights and stop behind the bus.",
        "Sound the horn as a warning and continue on.",
        "Reduce speed and overtake with caution."
      ],
      "correct": 4,
      "answerContent": "Always read the road and be prepared to react to any traffic situation ? in this case, be aware of vulnerable road users such as school children boarding or alighting from school buses."
    },
    {
      "id": 376,
      "content": "What should the driver do when driving behind a vehicle that is going from side to side on the road in an unsafe manner?",
      "labels": [4],
      "options": [
        "The driver should signal and go around to the right of the vehicle.",
        "The driver should drive close behind the vehicle with a view to overtaking.",
        "The driver should signal and go around to the left of the vehicle.",
        "The driver should stay well back in a safe position."
      ],
      "correct": 4,
      "answerContent": "You should always be prepared to react to hazards ahead. If the vehicle in front is moving from side to side, it may indicate that the driver is not paying full attention or that their driving is impaired by drink, drugs or tiredness. If you think the vehicle is a risk to the public safety, the matter should be reported to the Garda\xED or to traffic watch (lo-call 1890 205 805), but not while driving."
    },
    {
      "id": 377,
      "content": "What should a driver do if a heavy goods vehicle in front has moved out to make a left turn ahead?",
      "labels": [4],
      "options": [
        "Drive into the space on its left-hand side.",
        "Stay behind it and allow it to complete the turn.",
        "Move out immediately and overtake as quickly as possible.",
        "Move to the right but do not overtake."
      ],
      "correct": 2,
      "answerContent": "Always read the road ahead and be prepared to react to any traffic situation. In this case, you should be aware that the heavy goods vehicle will need extra space to complete the left-hand turn and you should remain behind the vehicle until it has completed its turn."
    },
    {
      "id": 378,
      "content": "What should a driver do if a bus in front has moved out to make a left-hand turn and there is oncoming traffic?",
      "labels": [4],
      "options": [
        "Overtake on the right-hand side.",
        "Stay back and allow the bus to complete the turn.",
        "Overtake on the left-hand side.",
        "Maintain speed until up close behind the bus."
      ],
      "correct": 2,
      "answerContent": "Always read the road ahead and be prepared to react to any traffic situation. In this case, you should be aware that the bus will need extra space to make the turn. So you should not overtake it if by doing so you would cause oncoming traffic to alter speed or course. Remember, you should never overtake when approaching a junction."
    },
    {
      "id": 379,
      "content": "What should a driver do if they see a truck reversing into a side entrance on the left-hand side of the road ahead?",
      "labels": [4],
      "options": [
        "Try to overtake it so as not to inconvenience traffic behind.",
        "Drive up close to the truck and stop.",
        "Stop back safely and wait until the way is clear.",
        "Sound the horn to indicate to the driver of the truck to stop."
      ],
      "correct": 3,
      "answerContent": "Always read the road ahead and be prepared to react to any traffic situation. You should be aware of the difficulties that drivers of large vehicles can have reversing into a side entrance. In this case, a large vehicle reversing could obstruct your view of the road ahead as you approach, and you should afford the truck driver adequate space to manoeuvre."
    },
    {
      "id": 380,
      "content": "What should a driver do if they are first in line to turn right at traffic lights while the green light is showing and there is oncoming traffic approaching?",
      "labels": [4],
      "options": [
        "Remain at the stop line until a green arrow comes on.",
        "Wait at the stop line for the light to turn amber and then make the turn.",
        "Go forward towards the centre of the junction and turn safely when a suitable gap appears.",
        "Remain at the stop line until a suitable gap in the oncoming traffic appears before making the turn."
      ],
      "correct": 3,
      "answerContent": "If you wish to turn right at a set of traffic lights, drive into the junction when you see a green light, taking care not to block any oncoming traffic. Then complete the turn when it is safe to do so."
    },
    {
      "id": 381,
      "content": "When meeting oncoming traffic on a national road, is it permitted to move into the hard shoulder to allow following traffic to overtake?",
      "labels": [4],
      "options": [
        "Yes, when a truck or bus is oncoming.",
        "No, except on '2-plus-1 roads?.",
        "No, it is never permitted to drive on a hard shoulder except in the case of an emergency.",
        "Yes, temporarily when the hard shoulder is clear and it is safe to drive there."
      ],
      "correct": 4,
      "answerContent": "On national roads, the hard shoulder is normally for the use of pedestrians and cyclists only. If you want to allow a vehicle behind to overtake, you may pull into the hard shoulder briefly as long as no pedestrians or cyclists are using it and there are no junctions or entrances nearby. In the case of motorways, however, you must not drive on the hard shoulder, except in an emergency."
    },
    {
      "id": 382,
      "content": "When driving on a national road is it permitted to drive on the hard shoulder in order to allow faster-moving traffic to overtake?",
      "labels": [4],
      "options": [
        "Only when a truck or bus wants to overtake.",
        "No, except when driving on a '2-plus-1 road?.",
        "Yes, temporarily when the hard shoulder is clear and it is safe to drive there.",
        "Only when driving on a dual carriageway."
      ],
      "correct": 3,
      "answerContent": "On national roads, the hard shoulder is normally for the use of pedestrians and cyclists only. If you want to allow a vehicle behind to overtake, you may pull into the hard shoulder briefly as long as no pedestrians or cyclists are using it and there are no junctions or entrances nearby. In the case of motorways, however, you must not drive on the hard shoulder, except in an emergency."
    },
    {
      "id": 383,
      "content": "What should a driver do in a queue of traffic controlled by traffic lights?",
      "labels": [4],
      "options": [
        "A driver should maintain their position in the queue.",
        "Overtake on the right and move to the head of the queue if there is space available.",
        "Put on a right signal to prevent following vehicles from overtaking.",
        "Overtake on the left and move to the head of the queue if there is space available."
      ],
      "correct": 1,
      "answerContent": "Always read the road ahead and be prepared to react to any traffic situation. From time to time you may have to queue in traffic. In this situation, you should try to remain patient and considerate of other road users. Jumping the queue is inconsiderate, it could be dangerous, and it could even provoke a road rage incident or cause a collision."
    },
    {
      "id": 384,
      "content": "What should the driver do when driving a vehicle they are not familiar with?",
      "labels": [4],
      "options": [
        "Initially drive with extra care and at a lower speed until fully familiar with the vehicle.",
        "Drive at a normal speed as all vehicle's features are the same.",
        "Only drive at night until familiar with the vehicle.",
        "Drive faster than normal in order to assess the vehicle's capability."
      ],
      "correct": 1,
      "answerContent": "You should know where to find and how to operate all the controls on your vehicle, including all of its safety features and warning lamps. When you are driving, you need to be able to concentrate on what's happening around you and operating the vehicle controls should be second nature to you. When you sit into the drivers seat of a vehicle you are not familiar with, you should do a thorough cockpit drill before you move off."
    },
    {
      "id": 385,
      "content": "Subject to the speed limit, what is the 'safest? speed to drive at?",
      "labels": [4],
      "options": [
        "The speed of the slowest vehicle on the road.",
        "A driver should always try to drive at the speed of other road users, regardless of the speed limit.",
        "A driver should always try to drive at the speed limit for the road that they are on.",
        "The speed that will enable the driver to stop the vehicle within the distance ahead that they can see to be clear."
      ],
      "correct": 4,
      "answerContent": "You should always drive at a speed that allows you to stop within the distance that you can see to be clear ahead. If you don't think you could safely bring the vehicle to a stop within the range of what you can see, then you're driving too fast ? slow down."
    },
    {
      "id": 386,
      "content": "When driving along and wishing to use a hand-held mobile phone, what should a driver do?",
      "labels": [4],
      "options": [
        "Stop at a safe location before using the phone.",
        "Secure the phone between head and shoulders while steering with both hands.",
        "Steer with one hand.",
        "Move the phone as needed and keep the call to just a few minutes."
      ],
      "correct": 1,
      "answerContent": "It is an offence and very unsafe to use a hand-held mobile phone while driving a vehicle or riding a motorbike as it prevents you from concentrating fully on your driving. While using a hands-free phone kit is not illegal, in some circumstances it could be a dangerous distraction, and you could be prosecuted for dangerous driving, careless driving or driving without due care and attention. If a driver needs to make a call they should pull in and stop in a place where it is safe to do so."
    },
    {
      "id": 387,
      "content": "When stopped at traffic lights and the green light comes on, what should a driver do?",
      "labels": [4],
      "options": [
        "Accelerate at a greater rate than other drivers so as to facilitate overtaking.",
        "Move off slowly and then check the mirrors.",
        "Check that other road users have cleared the junction and move off with care.",
        "Move off quickly and then check the mirrors."
      ],
      "correct": 3,
      "answerContent": "When stopped at traffic lights and the green light comes on, you should check to ensure the way is clear and proceed only if it is safe to do so."
    },
    {
      "id": 388,
      "content": "What should a driver do if another vehicle blocks their right of way at a junction?",
      "labels": [4],
      "options": [
        "Be patient and show restraint.",
        "Sound the horn and flash the lights to show your frustration.",
        "Pursue the vehicle and express displeasure.",
        "Flash the headlights to express displeasure."
      ],
      "correct": 1,
      "answerContent": "You should always try to show restraint. It is important to understand that the right of way is not an absolute right of way, and you must always proceed with caution and with regard for other road users. It's safer and more socially responsible."
    },
    {
      "id": 389,
      "content": "A driver who is about to undertake a journey is upset or angry. What should they do?",
      "labels": [4],
      "options": [
        "Being upset or angry does not affect driving.",
        "Drive slower than normal for a distance.",
        "Drive faster than normal for a distance.",
        "A driver should not drive until they are calm."
      ],
      "correct": 4,
      "answerContent": "If you drive when you are angry or upset, you are more likely to be involved in a collision, and more likely to react to other drivers bad behaviour. Take the time to calm down and compose yourself before you set out on a journey."
    },
    {
      "id": 390,
      "content": "When being overtaken and there is oncoming traffic, what should a driver do?",
      "labels": [4],
      "options": [
        "Allow the overtaking vehicle to pass and return safely to the left side of the road.",
        "Speed up so the following vehicle cannot overtake.",
        "Maintain position and flash the headlights to warn the oncoming traffic.",
        "Maintain position because other drivers should not have attempted to overtake."
      ],
      "correct": 1,
      "answerContent": "When you are being overtaken and there are oncoming vehicles, you should show consideration for all the other traffic and allow the overtaking vehicle to move in front of you to avoid the risk of a collision."
    },
    {
      "id": 391,
      "content": "When another driver is in a hurry and cuts in front what should a driver do?",
      "labels": [4],
      "options": [
        "Drive faster to make up for lost time.",
        "Flash the headlights to express their annoyance.",
        "Drive closely behind them so other vehicles cannot do the same.",
        "Be patient and not retaliate."
      ],
      "correct": 4,
      "answerContent": "If another driver behaves badly, you should not let it annoy you ? show restraint and don't react. Road rage only increases the risk of a collision."
    },
    {
      "id": 392,
      "content": "What should a driver do when they get a puncture while driving?",
      "labels": [4],
      "options": [
        "Continue on your journey and arrange for repair when convenient.",
        "Maintain speed until a place to change the wheel is identified.",
        "Stop at a safe place and change the wheel.",
        "If on a motorway, stop and change the wheel immediately."
      ],
      "correct": 3,
      "answerContent": "If you get a puncture while driving, find a suitable and safe place to stop and change the wheel. If you cant find a suitable place immediately, drive slowly (with your hazard warning lights turned on) to avoid further damage to the tyre or rim until a safe place is found."
    },
    {
      "id": 393,
      "content": "What should a driver do when they want to safely change to the lane on the right in which there is other traffic?",
      "labels": [4],
      "options": [
        "Pull in and stop, wait until a suitable gap appears and then move out to the right-hand lane.",
        "Use the mirror, signal and move into the right-hand lane when a suitable gap appears in the traffic in that lane.",
        "Increase speed until travelling at the same speed as the traffic in the right lane, then move over and check mirrors.",
        "Move gradually into the right-hand lane, indicate and then check mirrors."
      ],
      "correct": 2,
      "answerContent": "Any time you change lanes, you should use the Mirror/Signal/Mirror (blind spots)/Manoeuvre routine. Check your mirrors, signal your intention, check your mirrors again (and your blind spots), and when a suitable gap becomes available manoeuvre the vehicle into the next lane, giving way to traffic already in that lane."
    },
    {
      "id": 394,
      "content": "What effect does alcohol have on driver behaviour?",
      "labels": [4],
      "options": [
        "It slows down a driver's reactions.",
        "It does not affect driver behaviour or ability.",
        "It can increase perception and awareness.",
        "It can reduce a driver's confidence."
      ],
      "correct": 1,
      "answerContent": "Alcohol is a major factor in collisions that can lead to death and injury. Even small amounts of alcohol affect your judgement and ability to drive."
    },
    {
      "id": 395,
      "content": "What effect does drinking alcohol have on a driver?",
      "labels": [4],
      "options": [
        "It improves coordination.",
        "It increases awareness.",
        "It increases concentration.",
        "It reduces concentration."
      ],
      "correct": 4,
      "answerContent": "Alcohol is a major factor in collisions that lead to death and injury. Even small amounts of alcohol affect your judgement, your concentration and your ability to react to hazards. A driver should never ever drink and drive."
    },
    {
      "id": 396,
      "content": "If a motorist or a motorcyclist is taking medication which may affect their driving, what should they do?",
      "labels": [4],
      "options": [
        "Drive slower when under the influence of medication that affects driving.",
        "Drive for short distances only.",
        "Seek medical advice in relation to driving.",
        "Drink plenty of water while driving."
      ],
      "correct": 3,
      "answerContent": "Some medication can affect a drivers ability to drive safely. If you are on medication of any kind, you should ask your doctor or pharmacist to tell you if it is safe to drive while taking it. Read the patient information leaflet supplied with the medication."
    },
    {
      "id": 397,
      "content": "What effect does a wet road surface have on a vehicle's braking ability?",
      "labels": [4],
      "options": [
        "It makes no difference to the required braking distance.",
        "Modern tyres provide grip on a wet road as effectively as on a dry road.",
        "Generally, it doubles the braking distance of that required on a dry surface.",
        "It reduces the braking distance of that required on a dry surface."
      ],
      "correct": 3,
      "answerContent": "When it is wet, your tyres do not grip the road surface as well as when it is dry and your stopping distance is increased. For these reasons you should slow down during or after rain and keep a greater distance from the vehicle in front."
    },
    {
      "id": 398,
      "content": "After overtaking another vehicle, what should a driver do?",
      "labels": [4],
      "options": [
        "Move immediately into the left after passing the vehicle.",
        "Continue to signal right for a distance.",
        "Gradually move back into the left when the vehicle has been passed.",
        "Move back in front of the vehicle and reduce speed."
      ],
      "correct": 3,
      "answerContent": "After overtaking, check your mirrors, signal and return to your normal lane position as soon as it is safe. Take a smooth easy line, gradually moving back in and allowing the other vehicle plenty of space and don't cut in sharply."
    },
    {
      "id": 399,
      "content": "What would happen if a driver cuts in too soon when overtaking another vehicle?",
      "labels": [4],
      "options": [
        "The driver would not need to indicate when moving in.",
        "It would force the other vehicle to suddenly slow or change direction causing danger.",
        "It will force oncoming vehicles to suddenly slow causing danger.",
        "The safety gap between the vehicles increases."
      ],
      "correct": 2,
      "answerContent": "When overtaking make sure the road ahead is clear so you have enough distance to overtake and get back to your own side of the road without forcing any other road user to adjust speed or direction. When you are well past the vehicle, check the mirrors, signal and gradually return to the original lane, making sure not to cut across the vehicle you have passed."
    },
    {
      "id": 400,
      "content": "What should a driver do when overtaking parked vehicles in a residential area?",
      "labels": [4],
      "options": [
        "Keep close to the parked vehicles allowing maximum room for oncoming traffic.",
        "Allow sufficient clearance when passing.",
        "Move as far to the right as possible.",
        "Increase speed to overtake the vehicles as quickly as possible."
      ],
      "correct": 2,
      "answerContent": "When you are passing parked vehicles in a residential area, move into a safe overtaking position in good time and leave plenty of clearance between your vehicle and the parked vehicles to increase visibility of small children in the area and in case someone opens their car door in front of you."
    },
    {
      "id": 401,
      "content": "What stopping distance should a driver allow for when driving in snow or icy conditions?",
      "labels": [4],
      "options": [
        "Up to half the normal distance.",
        "The normal distance.",
        "Up to ten times the normal distance.",
        "Twice the normal distance."
      ],
      "correct": 3,
      "answerContent": "When driving in snow or icy conditions a driver should allow a greater distance from the vehicle in front as stopping distances can be increased by up to ten times the normal."
    },
    {
      "id": 402,
      "content": "What clearance should drivers normally allow for when passing parked vehicles?",
      "labels": [4],
      "options": [
        "The width of a side mirror.",
        "A car width.",
        "A door width.",
        "The width of an average person."
      ],
      "correct": 3,
      "answerContent": "When you are passing parked vehicles, you should leave at least a door's width of clearance in case somebody opens their car door unexpectedly, this will also increase visibility of pedestrians in the area."
    },
    {
      "id": 403,
      "content": "Why does it take longer to stop the vehicle on a wet road?",
      "labels": [4],
      "options": [
        "The tyres have less road grip than in dry weather.",
        "The suspension of the vehicle is lighter in wet weather.",
        "The brake fluid is less effective in wet weather.",
        "The tyres have more grip than in dry weather."
      ],
      "correct": 1,
      "answerContent": "When driving on wet road surfaces the grip of your tyres is reduced which may lead to significantly longer stopping distances. Drivers should be aware of these conditions and reduce speed as stopping quickly may result in skidding."
    },
    {
      "id": 404,
      "content": "What is the effect on the control of the vehicle if there is a film of water between the vehicle's tyres and the road surface?",
      "labels": [4],
      "options": [
        "Steering will be more effective.",
        "Steering and braking will be more effective.",
        "Braking only will be less effective.",
        "Steering and braking will be less effective."
      ],
      "correct": 4,
      "answerContent": "When driving on a road where there is a lot of surface water, a film of water can build up between the tyres and the road surface. When this occurs it is called aquaplaning, it reduces the grip of the tyres on the road and can result in the total loss of control over the vehicles steering and braking."
    },
    {
      "id": 405,
      "content": "What should a driver do if they encounter loose chippings on a road?",
      "labels": [4],
      "options": [
        "Slow down and allow extra clearance to other traffic.",
        "Stop the vehicle until the loose chippings can be removed.",
        "A driver should press their hand against the windscreen.",
        "Increase speed so as to avoid causing damage to the vehicle."
      ],
      "correct": 1,
      "answerContent": "Where there are loose chippings on the road, you should slow down and comply with any reduced speed limit and leave extra room (or clearance) between your vehicle and other traffic. This will also give you more time to stop if you need to, and it will help to reduce the amount of chippings your vehicle throws up against other vehicles and possible injury to pedestrians."
    },
    {
      "id": 406,
      "content": "What effect does spilt diesel have on a road?",
      "labels": [4],
      "options": [
        "It increases tyre noise.",
        "It makes the road more slippery.",
        "It improves tyre grip on bends.",
        "It improves the vehicle's braking ability."
      ],
      "correct": 2,
      "answerContent": "Diesel spilt on the road can make the road surface extremely slippery, particularly if the road is wet."
    },
    {
      "id": 407,
      "content": "What effect does patches of oil or diesel have on a road surface?",
      "labels": [4],
      "options": [
        "It improves tyre surface grip.",
        "It improves the vehicle's braking ability.",
        "It increases tyre surface noise.",
        "It reduces the tyre surface grip."
      ],
      "correct": 4,
      "answerContent": "A patch of oil or diesel on the road can seriously reduce the grip of your tyres on the road, which may result in a possible skid."
    },
    {
      "id": 408,
      "content": "What should a driver do when driving in slippery road conditions?",
      "labels": [4],
      "options": [
        "Drive at lower speeds and use gentle acceleration and braking.",
        "Apply the brakes sharply from time to time to test the road surface.",
        "Maintain a normal distance from the vehicle in front.",
        "Drive at normal speed but allow extra stopping distance."
      ],
      "correct": 1,
      "answerContent": "When driving in slippery road conditions, drivers should be particularly smooth and gradual in the way they accelerate and brake. This will help to avoid skidding or slipping and helps to maintain control of the vehicle."
    },
    {
      "id": 409,
      "content": "What should a driver do when travelling downhill on snow or ice?",
      "labels": [4],
      "options": [
        "Avoid using the brake and use a high gear.",
        "Select an appropriate gear and brake gently to control speed.",
        "Keep close to the left and brake sharply to reduce speed.",
        "Use a higher gear than normal in order to avoid wheel spin."
      ],
      "correct": 2,
      "answerContent": "When travelling downhill in snow or ice, you should select a lower gear to take advantage of engine braking and use the brakes very gently when you need to."
    },
    {
      "id": 410,
      "content": "What is the recommended minimum stopping distance for a car travelling at 50\xA0km/h on a dry road?",
      "labels": [4],
      "options": [
        "55\xA0metres.",
        "25\xA0metres.",
        "15\xA0metres.",
        "5\xA0metres."
      ],
      "correct": 2,
      "answerContent": "The total minimum stopping distance of a vehicle depends on four things; perception time, reaction time, the vehicles reaction time and the vehicle braking capability. The recommend minimum stopping distance of a car driving at 50\xA0km/h under dry conditions is 25\xA0metres."
    },
    {
      "id": 411,
      "content": "What is the recommended minimum stopping distance for a car travelling at 50\xA0km/h on a wet road?",
      "labels": [4],
      "options": [
        "56\xA0metres.",
        "36\xA0metres.",
        "76\xA0metres.",
        "16\xA0metres."
      ],
      "correct": 2,
      "answerContent": "The total minimum stopping distance of a vehicle depends on four things; perception time, reaction time, the vehicles reaction time and the vehicle braking capability. The recommend minimum stopping distance of a car driving at 50\xA0km/h under wet conditions is 36\xA0metres."
    },
    {
      "id": 412,
      "content": "What is the recommended minimum stopping distance for a car travelling at 100\xA0km/h on a dry road?",
      "labels": [4],
      "options": [
        "70\xA0metres.",
        "120\xA0metres.",
        "90\xA0metres.",
        "30\xA0metres."
      ],
      "correct": 1,
      "answerContent": "The total minimum stopping distance of a vehicle depends on four things; perception time, reaction time, the vehicles reaction time and the vehicle braking capability. The recommend minimum stopping distance of a car driving at 100\xA0km/h under dry conditions is 70\xA0metres."
    },
    {
      "id": 413,
      "content": "In dry weather how might a driver judge what is a safe following distance to vehicle in front?",
      "labels": [4],
      "options": [
        "By allowing at least two vehicle lengths between the vehicles.",
        "By using a fixed point and applying the two second rule.",
        "Drive at the same speed as the vehicle in front.",
        "Allow a least two vehicle lengths for each kilometre per hour."
      ],
      "correct": 2,
      "answerContent": "A driver can judge a safe distance from the vehicle in front by using the two second rule. This is measured by picking a fixed point. As the vehicle in front passes it, begin saying 'only a fool breaks the two second rule?. If you pass the fixed point before you have finished the phrase, then your vehicle is too close, safely slow and increase your distance from the vehicle in front."
    },
    {
      "id": 414,
      "content": "In wet weather how might a driver judge what is a safe following distance from the vehicle in front?",
      "labels": [4],
      "options": [
        "By allowing at least two seconds to elapse between the vehicle in front and the driver's own vehicle passing a fixed point.",
        "By allowing two vehicle lengths between the vehicles.",
        "By allowing at least four seconds to elapse between the vehicle in front and the driver's own vehicle passing a fixed point.",
        "By allowing four vehicle lengths between the vehicles."
      ],
      "correct": 3,
      "answerContent": "In wet conditions you should maintain a gap of at least four seconds from the vehicle in front ? at least twice as long as in dry conditions."
    },
    {
      "id": 415,
      "content": "What phrase is recommended for drivers to help them determine a safe distance from the vehicle in front on a dry road?",
      "labels": [4],
      "options": [
        "'Only a fool breaks the one second rule.?",
        "'Only a fool breaks the four second rule.?",
        "'Only a fool breaks the two second rule.?",
        "'Only a fool breaks the three second rule.?"
      ],
      "correct": 3,
      "answerContent": "A driver can judge a safe distance from the vehicle in front by using the two second rule. This is measured by picking a fixed point. As the vehicle in front passes it, begin saying 'only a fool breaks the two second rule?. If you pass the fixed point before you have finished the phrase, then your vehicle is too close, safely slow and increase your distance from the vehicle in front."
    },
    {
      "id": 416,
      "content": "What lights should a driver use when driving in dense fog?",
      "labels": [4],
      "options": [
        "Drive with dipped headlights and fog lights.",
        "Drive with sidelights and hazard warning lights.",
        "Drive with sidelights and fog lights.",
        "Drive with full headlights and fog lights."
      ],
      "correct": 1,
      "answerContent": "In dense fog you should use dipped headlights and fog lights (where fitted). Sidelights are not strong enough in fog, and full headlights can reflect off the fog and make it harder to see where you are going."
    },
    {
      "id": 417,
      "content": "When driving at night the full headlights of a typical car should enable the driver to see for a distance of how many metres?",
      "labels": [4],
      "options": [
        "150\xA0metres.",
        "100\xA0metres.",
        "200\xA0metres.",
        "50\xA0metres."
      ],
      "correct": 2,
      "answerContent": "At night in good driving conditions the full headlights of a car will typically let you see 100\xA0metres ahead. So, you should travel at a speed that allows you to stop within that distance."
    },
    {
      "id": 418,
      "content": "When driving at night the dipped headlights of a typical car should enable the driver to see for a distance of how many metres?",
      "labels": [4],
      "options": [
        "20\xA0metres.",
        "40\xA0metres.",
        "50\xA0metres.",
        "30\xA0metres."
      ],
      "correct": 4,
      "answerContent": "When driving at night in good driving conditions the dipped headlights of a car will typically let you see 30\xA0metres ahead. So, you should travel at a speed that allows you to stop in that distance."
    },
    {
      "id": 419,
      "content": "What are the possible consequences of having incorrectly adjusted headlights?",
      "labels": [4],
      "options": [
        "The wattage of the headlights could be reduced.",
        "Visibility could be increased.",
        "The headlights could overheat.",
        "Oncoming road users could be dazzled."
      ],
      "correct": 4,
      "answerContent": "You are responsible for making sure that your vehicle is roadworthy and that its headlights are adjusted correctly. If the headlights are out of line they are less effective and may dazzle oncoming traffic, even when dipped."
    },
    {
      "id": 420,
      "content": "When driving at night and blinded by the lights of an oncoming vehicle, what should a driver do?",
      "labels": [4],
      "options": [
        "Repeatedly flash the headlights to warn the offending driver.",
        "Look towards the verge and slow down and stop if necessary.",
        "Reduce speed and switch on the full headlights.",
        "Drive well to the left and maintain normal speed."
      ],
      "correct": 2,
      "answerContent": "If you are dazzled by the lights of an oncoming vehicle, look towards the verge until the vehicle has passed. Slow down and stop if necessary."
    },
    {
      "id": 421,
      "content": "A driver has been driving regularly in daylight and must now undertake a journey at night. What should the driver do?",
      "labels": [4],
      "options": [
        "Drive at a higher speed than during the day as traffic is lighter at night.",
        "Drive at a higher speed than during the day to minimise the chances of following asleep.",
        "Drive at a slower speed than in the day as visibility is reduced at night.",
        "Drive at the same speed as during the day as there is no extra danger."
      ],
      "correct": 3,
      "answerContent": "If you are not familiar with driving at night time, it can take quite a while to adjust to conditions. For that reason, you might need to drive slower until you get used to the reduced visibility at night."
    },
    {
      "id": 422,
      "content": "With regard to vehicle speed, what should a driver do when driving at night?",
      "labels": [4],
      "options": [
        "Drive at a speed that enables the driver to stop within the distance ahead that they can see to be clear.",
        "Increase vehicle speed as traffic is lighter at night.",
        "Maintain normal vehicle speed and drive with full headlights.",
        "Drive at a higher speed than during the day to reduce the chances of falling asleep."
      ],
      "correct": 1,
      "answerContent": "When driving at night in good driving conditions the full headlights of a car will typically let you see 100\xA0metres ahead. So, you should travel at a speed that allows you to stop in that distance."
    },
    {
      "id": 423,
      "content": "When driving at night, what is the safest approach for a driver to adopt?",
      "labels": [4],
      "options": [
        "Drive at a speed that enables the driver to stop within the distance ahead that they can see to be clear.",
        "Drive with full headlights on at all times.",
        "Drive at the maximum speed limit with dipped headlights on at all times.",
        "Drive at the maximum speed limit with full headlights on to see clearly ahead."
      ],
      "correct": 1,
      "answerContent": "When driving at night in good driving conditions the dipped headlights of a car will typically let you see 30\xA0metres ahead. So, you should travel at a speed that allows you to stop in that distance."
    },
    {
      "id": 424,
      "content": "When meeting an oncoming vehicle at night, what should a driver do?",
      "labels": [4],
      "options": [
        "Avoid looking directly at the oncoming vehicle's lights.",
        "Focus eyes directly on the steering.",
        "Focus eyes directly on the oncoming vehicle's lights.",
        "Increase speed to pass the oncoming vehicle."
      ],
      "correct": 1,
      "answerContent": "If you are dazzled by the lights of an oncoming vehicle, look towards the verge until the vehicle has passed and/or slow down and stop if necessary."
    },
    {
      "id": 425,
      "content": "When is it safe for a driver to use the main beam headlights when driving at night?",
      "labels": [4],
      "options": [
        "In built up areas where there is good street lighting",
        "This practice is not permitted.",
        "When there is no oncoming traffic.",
        "When following a vehicle a short distance ahead."
      ],
      "correct": 3,
      "answerContent": "Drivers should use the main beam headlights, to improve visibility, when driving at night in unlit rural areas ? this will enable them to see as far ahead as possible. Making sure, however, that these lights are dimmed where necessary to avoid dazzling or inconveniencing other road users."
    },
    {
      "id": 426,
      "content": "What lights should a driver have on when driving behind other traffic at night?",
      "labels": [4],
      "options": [
        "Front Fog lights.",
        "Main Beam headlights.",
        "Dipped headlights.",
        "Side lights."
      ],
      "correct": 3,
      "answerContent": "Drivers should dip their headlights when driving behind another vehicle so the driver in front is not dazzled by your lights in their mirror."
    },
    {
      "id": 427,
      "content": "When driving at night, when must a driver use dipped headlights?",
      "labels": [4],
      "options": [
        "When meeting or driving behind other traffic.",
        "When driving at more than 100\xA0km/h.",
        "When driving at less than 50\xA0km/h.",
        "When there is no oncoming traffic."
      ],
      "correct": 1,
      "answerContent": "When driving at night drivers should dip their main beam headlights when meeting or following traffic to avoid dazzling or endangering other road users."
    },
    {
      "id": 428,
      "content": "When driving late at night what should a driver be aware of?",
      "labels": [4],
      "options": [
        "That all pedestrians will be wearing high visibility clothing.",
        "That speed limits do not apply between midnight and 6\xA0am.",
        "That trucks may drive in the outside lane of a motorway.",
        "That there is a danger of themselves or other drivers falling asleep."
      ],
      "correct": 4,
      "answerContent": "Driving when tired can be very dangerous and driver fatigue is one of the main causes of serious road collisions. If a driver becomes drowsy while driving, they should stop in a safe place take a caffeine-based drink and take a short nap. After this they should then get some fresh air and stretch their legs for a few minutes before setting off again. The only cure for fatigue is proper sleep. Never ever drive when tired."
    },
    {
      "id": 429,
      "content": "When dazzled by the lights of an oncoming vehicle, what should a driver do?",
      "labels": [4],
      "options": [
        "Shield their eyes with their hand.",
        "Do not look directly at the lights.",
        "Look at the dashboard momentarily.",
        "Turn their head to the right."
      ],
      "correct": 2,
      "answerContent": "If dazzled by the lights of an oncoming vehicle, do not look directly at the oncoming lights. Instead glance towards the verge until the vehicle has passed and/or slow down and stop if necessary. This will avoid any temporary blindness caused by the brightness of the oncoming lights."
    },
    {
      "id": 430,
      "content": "When should a driver use fog lights on their vehicle?",
      "labels": [4],
      "options": [
        "Use fog lights on a badly lit country road.",
        "Switch on fog lights as a warning to pedestrians.",
        "Use fog lights to improve visibility during light rain.",
        "Use fog lights only in dense fog and falling snow."
      ],
      "correct": 4,
      "answerContent": "A driver should use fog lights only during dense fog or falling snow. They must be switched off at all other times."
    },
    {
      "id": 431,
      "content": "When can a driver expect to encounter black ice?",
      "labels": [4],
      "options": [
        "Black ice only occurs on motorways.",
        "Only in the early hours of the morning.",
        "When the temperature drops close to freezing.",
        "Only late at night."
      ],
      "correct": 3,
      "answerContent": "Black ice is an almost invisible and thin coating of ice on the surface of the road. Sometimes it can look like a sheet of water or as if the road is wet."
    },
    {
      "id": 432,
      "content": "What should a driver do if there is black ice on the road?",
      "labels": [4],
      "options": [
        "Apply the brakes regularly to prevent them from freezing.",
        "Avoid harsh braking, steering and acceleration.",
        "Only use a low gear to improve traction.",
        "Apply the brakes regularly to check road surface."
      ],
      "correct": 2,
      "answerContent": "If a driver suspects black ice, they should avoid harsh braking, steering and acceleration. This will help reduce the risk of skidding."
    },
    {
      "id": 433,
      "content": "Where is black ice likely to occur on the road?",
      "labels": [4],
      "options": [
        "On a hard shoulder only.",
        "In sheltered or shaded areas.",
        "Only in built-up areas.",
        "In mild weather on a coastal road."
      ],
      "correct": 2,
      "answerContent": "Black ice is an almost invisible and thin coating of ice on the road surface. Because it is hard to see, it is particularly dangerous. When the temperature drops close to freezing you can expect to see black ice - particularly in sheltered or shaded areas of the roadway under trees or beside high walls. In wintry conditions, if you notice a reduction in tyre noise or if the steering becomes lighter, you should suspect that there may be black ice on the road."
    },
    {
      "id": 434,
      "content": "What is the safest practice when driving on icy roads?",
      "labels": [4],
      "options": [
        "Drive at a slower speed than usual using gentle acceleration and braking.",
        "Rely completely on the ABS or other advanced driver assistance systems.",
        "Drive in a low gear at all times using maximum acceleration.",
        "Drive at normal speed but apply the brakes from time to time to check for grip."
      ],
      "correct": 1,
      "answerContent": "When driving on icy roads a driver should avoid harsh braking, steering and acceleration. This will help reduce the risk of skidding."
    },
    {
      "id": 435,
      "content": "When driving, what effect could icy roads have on the vehicle?",
      "labels": [4],
      "options": [
        "Tyre grip improves in lower temperatures.",
        "The vehicle would be more likely to skid.",
        "Front tyre pressure increases.",
        "Rear tyre pressure increases."
      ],
      "correct": 2,
      "answerContent": "Icy roads can have a dramatic effect on the way a vehicle handles, and there can be an increased risk of skidding. When driving on icy roads a driver should avoid harsh braking, steering and acceleration. This will help reduce the risk of skidding."
    },
    {
      "id": 436,
      "content": "What should a driver do when driving in slippery road conditions?",
      "labels": [4],
      "options": [
        "Accelerate harder using only the lower gears.",
        "Brake regularly to improve tyre grip.",
        "Drive slower than normal keeping a close distance to the vehicle in front.",
        "Use gentle acceleration and braking."
      ],
      "correct": 4,
      "answerContent": "Tyres have less grip on the road when it is wet or icy. Slow down in slippery conditions, and keep a greater distance from the vehicle in front."
    },
    {
      "id": 437,
      "content": "How should a driver negotiate a steep hill or humpbacked bridge when the road is slippery?",
      "labels": [4],
      "options": [
        "Press the clutch and brake together.",
        "Press the clutch only.",
        "Drive with extreme caution.",
        "Select neutral gear position."
      ],
      "correct": 3,
      "answerContent": "Be extra careful when negotiating steep hills or humpbacked bridges in slippery conditions. Slow down gently on the approach, select the appropriate gear for the speed of the vehicle and use gentle steering and acceleration."
    },
    {
      "id": 438,
      "content": "Apart from the risk of skidding, what should the driver be aware of when driving in snow?",
      "labels": [4],
      "options": [
        "The brake fluid may freeze, causing the brakes to fail.",
        "Road signs and road markings may become obscured.",
        "The air in the tyres may freeze, causing them to burst.",
        "The power steering fluid may freeze causing the steering to fail."
      ],
      "correct": 2,
      "answerContent": "Road signs and road markings may become obscured by snow. If this happens you may have difficulty reading regulatory, warning and information signs. This is the main reason why these signs are different shapes. Drivers should pay particular attention when travelling in these conditions."
    },
    {
      "id": 439,
      "content": "What should a driver do when driving in heavy rain?",
      "labels": [4],
      "options": [
        "Increase speed so that the vehicle will glide over any standing water.",
        "Weave the vehicle slightly in order to improve tyre grip.",
        "Maintain normal speeds as on a dry road.",
        "Be aware that the vehicle may slide or 'aquaplane?."
      ],
      "correct": 4,
      "answerContent": "On a wet road, a film of water can build up between the tyres and the road surface. This is called aquaplaning and it has the effect of reducing the grip of the tyres on the road, and this affects the steering and braking. For these reasons the driver should slow down during and after rain and keep a greater distance from the vehicle in front."
    },
    {
      "id": 440,
      "content": "What is the danger in driving at high speeds on wet roads?",
      "labels": [4],
      "options": [
        "Danger of 'aquaplaning? or sliding across the road surface.",
        "Danger that tyre pressure will automatically increase.",
        "There is no danger provided that the tyre pressure has been increased to take account of weather conditions.",
        "There is no danger provided that the tyre pressure has been reduced to take account of weather conditions."
      ],
      "correct": 1,
      "answerContent": "The driver should moderate their speed during heavy rain or where water is building up on the road surface. This will help to avoid 'aquaplaning? which has the effect of reducing the grip of the tyres on the road, and this affects the steering and braking. For these reasons the driver should slow down during and after rain and keep a greater distance from the vehicle in front."
    },
    {
      "id": 441,
      "content": "What should a driver do when they encounter mud on the road?",
      "labels": [4],
      "options": [
        "Apply the brakes immediately and put on the hazard warning lights.",
        "Reduce speed and be aware of farm or works vehicles on the road.",
        "Gradually increase speed so that the mud on the road will not stick to the tyres.",
        "Change to a lower gear and pump the brakes to see how slippery the surface is."
      ],
      "correct": 2,
      "answerContent": "Where there is mud on the road you should slow down and be aware that there is a danger of skidding. Your stopping distance will also be greater where there is mud on the road."
    },
    {
      "id": 442,
      "content": "What should a rider be aware of when crossing road markings such as lines or arrows?",
      "labels": [4],
      "options": [
        "Tyre grip is reduced.",
        "Steering is improved.",
        "Tyre grip is improved.",
        "Tyre grip is not affected."
      ],
      "correct": 1,
      "answerContent": "Riding on just 2 wheels, riders need to be on the constant lookout for irregularities and other problems with the road surface. This can include all road markings."
    },
    {
      "id": 443,
      "content": "What should a driver do after passing through a flooded section of road?",
      "labels": [4],
      "options": [
        "Apply the brake pedal lightly at slow speed for a short distance to dry the brakes.",
        "Apply the brakes firmly to check if they are still effective.",
        "Apply the handbrake gradually to dry out the rear brakes only.",
        "Increase the speed of the vehicle to dry out the brakes."
      ],
      "correct": 1,
      "answerContent": "When driving through a flooded section of road, brakes may become less effective. If this happens, test brakes to ensure that they have not been affected by the water ? check mirrors before doing so. If they have been affected, press gently on the brake pedal when driving until they dry out and return to normal."
    },
    {
      "id": 444,
      "content": "What should a driver do where a section of road ahead has a shallow flooded area?",
      "labels": [4],
      "options": [
        "Increase speed and use a higher gear.",
        "Decrease speed and use a higher gear.",
        "Drive in a low gear as slowly as possible keeping the revs high.",
        "Use a high gear and maintain the same speed keeping the engine revs low."
      ],
      "correct": 3,
      "answerContent": "When approaching a stretch of road with shallow flooding, reduce speed and assess the area for any danger. When driving through surface water, drive in a low gear as slowly as possible keeping the revs high to avoid stalling."
    },
    {
      "id": 445,
      "content": "What should a driver do when approaching roadworks warning signs?",
      "labels": [4],
      "options": [
        "Increase speed and move to the centre of the road.",
        "Reduce speed and be prepared to stop for works vehicles or a flagman.",
        "Engage a higher gear to avoid getting stuck in soft tar.",
        "Increase speed until signalled to slow down by a flagman."
      ],
      "correct": 2,
      "answerContent": "A driver should always approach roadworks with caution as there are many possible hazards to deal with ? including road workers, works vehicles, uneven road surfaces and temporary traffic controls."
    },
    {
      "id": 446,
      "content": "What should a driver be aware of when driving through a section of road where roadworks are ongoing?",
      "labels": [4],
      "options": [
        "That the driver always has the right of way over works vehicles.",
        "Narrower lanes than usual and restricted shoulder areas.",
        "That road workers are always aware of the movement of traffic.",
        "That the area will be cleared for the driver so that there are no traffic delays."
      ],
      "correct": 2,
      "answerContent": "When travelling through a section of roadworks, a driver needs to be extra careful, as the road surface area may be considerably reduced. It may be narrower, uneven, slippery or there may be loose chippings which may pose a danger for road workers and other road users."
    },
    {
      "id": 447,
      "content": "When wishing to turn right at the end of a one-way street, where should a driver position their vehicle?",
      "labels": [4],
      "options": [
        "Drive in either lane as there is no oncoming traffic",
        "Drive as close as possible to the left-hand side of the road.",
        "Drive occupying both lanes when approaching the end of the street.",
        "Drive as close as is possible to the right-hand side of the road."
      ],
      "correct": 4,
      "answerContent": "When a driver wants to turn right on a one way street, they should check their mirrors, signal right and manoeuvre into the right-hand side when it is safe to do so. Then complete the turn into the appropriate lane of the street they are entering."
    },
    {
      "id": 448,
      "content": "When a driver wants to turn left into a property and there is a bus lane on the left, what should the driver do?",
      "labels": [4],
      "options": [
        "A driver should give way to buses only.",
        "Give way to cyclists and taxis which may be using the bus lane.",
        "Give way to cyclists, taxis and buses which may be using the bus lane.",
        "A driver should never turn left across a bus lane."
      ],
      "correct": 3,
      "answerContent": "If a driver needs to cross a bus lane on their left in order to enter a property, they should take extra care that there are no buses, taxis or cyclists in the bus lane. They should check mirrors, signal and turn into the property when it is safe to do so."
    },
    {
      "id": 449,
      "content": "What traffic may use a contra-flow bus lane?",
      "labels": [4],
      "options": [
        "Buses and motorised wheelchairs only.",
        "Buses, taxis and motorcycles.",
        "Buses on a scheduled service.",
        "Buses, taxis and cyclists."
      ],
      "correct": 3,
      "answerContent": "A contra-flow bus lane is one that runs in the opposite direction to traffic beside it. Only buses on a scheduled service may use a contra-flow bus lane."
    },
    {
      "id": 450,
      "content": "What traffic may use a with-flow bus lane during the times specified on information signs at the start of the lane?",
      "labels": [4],
      "options": [
        "All traffic.",
        "Vehicles with more than one passenger.",
        "Buses, taxis and cyclists.",
        "Buses only."
      ],
      "correct": 3,
      "answerContent": "A bus lane is a special lane for the use of buses. A with-flow bus lane is one that runs in the same direction as the traffic beside it. Taxis and cyclists may also use with-flow bus lanes. Other traffic may use them outside the hours posted on the accompanying plate."
    },
    {
      "id": 451,
      "content": "When driving along a dual carriageway in normal driving conditions, which lane should a driver be in?",
      "labels": [4],
      "options": [
        "In either lane.",
        "In the right-hand lane except when driving a works vehicle or HGV.",
        "In the left-hand lane unless the driver wishes to overtake or turn right.",
        "In the right-hand lane."
      ],
      "correct": 3,
      "answerContent": "You must normally drive in the left-hand lane of a dual carriageway, except when overtaking or turning right a short distance ahead."
    },
    {
      "id": 452,
      "content": "What does a 2-plus-1 road have?",
      "labels": [4],
      "options": [
        "Barriers between lanes of traffic going in the same direction.",
        "Two lanes for cars and one lane for trucks and buses.",
        "Barriers between the hard shoulder and the verge.",
        "Two lanes of traffic in one direction and one in the opposite direction."
      ],
      "correct": 4,
      "answerContent": "A 2'plus-1 road consists of two lanes in one direction of travel and one lane in the other direction. The two-lane section allows for safe overtaking and alternates with a one-lane section roughly every 2\xA0kilometres."
    },
    {
      "id": 453,
      "content": "What should a driver do when travelling on a motorway or dual carriageway?",
      "labels": [4],
      "options": [
        "Match the speed to that of the vehicle in the adjoining lane.",
        "Be alert for other drivers who may suddenly change lanes or reduce speed.",
        "Match the speed to that of the vehicle in front.",
        "Relax because there will be no oncoming traffic."
      ],
      "correct": 2,
      "answerContent": "Motorways and dual carriageways are designed to help traffic travel faster and more safely between destinations. Traffic conditions can change very quickly because of the speed and increased volumes of traffic and lanes, and you need to be particularly alert to other drivers changing lanes or reducing speed."
    },
    {
      "id": 454,
      "content": "In normal driving conditions on a motorway, which lane should the driver occupy?",
      "labels": [4],
      "options": [
        "Drive in the offside (right-hand) lane unless intending to take a left exit.",
        "Drive in the nearside (left-hand) lane unless intending to overtake.",
        "Drive in the offside (right-hand) lane as the nearside (left-hand)lane is for HGVs and buses only.",
        "Constantly manoeuvre between whichever lane has the least volume of traffic."
      ],
      "correct": 2,
      "answerContent": "The normal keep left rules apply when you are driving on a motorway ? a driver should stay in the nearside (left hand) lane unless they are overtaking."
    },
    {
      "id": 455,
      "content": "What should a driver do when joining a motorway from a slip road?",
      "labels": [4],
      "options": [
        "Try to match the vehicle speed to that of traffic already on the motorway and merge into it in a suitable gap.",
        "Drive directly onto the motorway as the driver on the acceleration lane has right of way.",
        "Drive along the hard shoulder until a suitable gap appears in the motorway traffic to allow the driver to merge into it.",
        "Always stop at the end of the acceleration lane and yield to traffic on the motorway"
      ],
      "correct": 1,
      "answerContent": "When joining a motorway a driver should try to match their speed to that of the motorway traffic and merge into it when a suitable gap appears, avoiding driving in the hard shoulder, while yielding to traffic already on the motorway."
    },
    {
      "id": 456,
      "content": "Is a driver permitted to pick up or set down a passenger on a motorway?",
      "labels": [4],
      "options": [
        "A driver is never permitted to pick up or set down passengers on a motorway.",
        "It is permitted provided that the driver stops on the hard-shoulder.",
        "It is not permitted, except during daylight hours.",
        "It is only permitted within 200\xA0metres of a slip-road."
      ],
      "correct": 1,
      "answerContent": "Motorways are designed so that traffic can move faster and more freely. It is illegal and dangerous to stop a vehicle on any part of a motorway except in an emergency or when signalled to do so by a Garda."
    },
    {
      "id": 457,
      "content": "When driving on a motorway, what should a driver do if they miss their exit?",
      "labels": [4],
      "options": [
        "Leave the motorway at the next exit and cross to the other side using the fly-over (or underpass).",
        "Wait on the hard shoulder until a suitable gap appears in traffic from both directions and then cross to the opposite side of the motorway.",
        "Stop on the hard shoulder, switch on their hazard lights and reverse back to the desired exit.",
        "Cross to the opposite side of the motorway when there is a suitable gap in the oncoming traffic."
      ],
      "correct": 1,
      "answerContent": "If a driver misses their intended exit when driving on a motorway, they should proceed to the next junction exit where they can leave the motorway and then rejoin it on the opposite side of the motorway."
    },
    {
      "id": 458,
      "content": "What should a driver do when entering a slip road after leaving a motorway?",
      "labels": [4],
      "options": [
        "Comply with the speed limit on the road the driver is joining.",
        "Always reduce speed gradually for a few kilometres.",
        "There is never a need to adjust speed when on a slip road.",
        "Brake severely when entering the slip road in order to slow down."
      ],
      "correct": 1,
      "answerContent": "When a driver is leaving a motorway, they should enter the deceleration lane and reduce their speed. They should comply with the speed limit of the road they are entering."
    },
    {
      "id": 459,
      "content": "What should a driver do if they drive past their intended exit by mistake?",
      "labels": [4],
      "options": [
        "Stop on the hard shoulder and reverse back to the exit.",
        "Drive on and leave at the next exit.",
        "Use the emergency telephone to ask for advice.",
        "Carefully complete a U-turn."
      ],
      "correct": 2,
      "answerContent": "If a driver misses their intended exit when driving on a motorway, they should proceed to the next junction exit where they can leave the motorway and then rejoin it in the opposite direction."
    },
    {
      "id": 460,
      "content": "What is the main difference between driving on a motorway and driving on other types of road?",
      "labels": [4],
      "options": [
        "Traffic generally travels at lower speeds on a motorway than on a dual-carriageway.",
        "Learner permit holders must be accompanied by a full licence holder.",
        "Traffic is generally permitted to travel at a higher speed on a motorway.",
        "Traffic travelling at 120\xA0km/h must only use the outside lane of a motorway."
      ],
      "correct": 3,
      "answerContent": "Motorways are designed so that traffic can move faster and more freely, without traffic lights, crossroads, level crossings and other road features that might slow down traffic. There are also restrictions on who may use a motorway ? for example L-drivers and motorcycles under 50\xA0cc are prohibited."
    },
    {
      "id": 461,
      "content": "On a 2-lane motorway, what procedure should a driver adopt when wishing to overtake another vehicle safely?",
      "labels": [4],
      "options": [
        "Use their mirrors, signal and overtake in the right-hand lane when it is safe to do so.",
        "Use their mirrors, signal and overtake in the left-hand lane only.",
        "Signal, use their mirrors and overtake in any available lane when it is safe to do so.",
        "Check for following traffic and overtake in either lane."
      ],
      "correct": 1,
      "answerContent": "When a driver wants to overtake on a motorway, they should generally only overtake on the right unless traffic is travelling in slow moving queues. The driver should use the Mirror/Signal/Mirror (blind spots)/Manoeuvre routine. Check mirrors, signal intention, check mirrors again (and blind spots), and complete the manoeuvre when it is safe to do so. They should pay particular attention to the speed of the traffic behind them before they move out. When they have finished overtaking, they should move back into the left-hand lane smoothly."
    },
    {
      "id": 462,
      "content": "What may the hard shoulder of a motorway be used for?",
      "labels": [4],
      "options": [
        "Stopping in an emergency.",
        "Exiting the motorway.",
        "Stopping to use a mobile phone.",
        "Joining the motorway."
      ],
      "correct": 1,
      "answerContent": "There are extra dangers when driving on a motorway because of the increased volume of traffic and higher speed. For safety reasons a driver should not drive or stop on the hard shoulder of a motorway except in an emergency or breakdown."
    },
    {
      "id": 463,
      "content": "After exiting the motorway and coming towards a junction at the end of the deceleration lane (slip road) what should a driver do?",
      "labels": [4],
      "options": [
        "The driver must always stop at the end of a slip road.",
        "Be alert for oncoming and crossing traffic at the end of the slip road.",
        "The driver should continue at the junction as traffic on the slip road has right of way.",
        "Maintain motorway speeds to the end of the slip road."
      ],
      "correct": 2,
      "answerContent": "The driver should check for signs showing a lower speed; Use the speedometer to make sure that they are obeying the reduced speed limit; remember that the slip roads and link roads between motorways may include sharp bends and that they may encounter junctions and other traffic. Remember that motorway rules no longer apply."
    },
    {
      "id": 464,
      "content": "A driver wishes to go straight ahead at a cross junction of equal importance. If they encounter other traffic, what is the general rule that applies?",
      "labels": [4],
      "options": [
        "Give way to traffic approaching from the left only.",
        "Give way to traffic approaching firstly from the left and then the right.",
        "Carry on as normal as they always have the right of way.",
        "Traffic approaching from the driver's right has right of way."
      ],
      "correct": 4,
      "answerContent": "If a driver is at a junction where the roads are of equal importance, traffic on the driver's right has the right of way. The driver must let that traffic pass before moving on. It is important to understand that the right of way is not an absolute right. Drivers must proceed with caution whilst showing regard for other users of the road."
    },
    {
      "id": 465,
      "content": "When approaching a roundabout, to whom should a driver give way ?",
      "labels": [4],
      "options": [
        "The driver must only give way to heavy goods vehicles on the roundabout.",
        "The driver approaching the roundabout always has right of way.",
        "The driver must give way to traffic approaching from the right or already on the roundabout.",
        "The driver must only give way to pedestrians and cyclists on the roundabout."
      ],
      "correct": 3,
      "answerContent": "Drivers should always approach roundabouts with caution. They should be prepared to give way to traffic on the right, traffic already on the roundabout, pedestrians already crossing and to always stop if necessary."
    },
    {
      "id": 466,
      "content": "In general, where two lanes are provided on the approach to a roundabout, which lane should a driver select when they intend taking an exit to the right (past the 12 o'clock position) of the roundabout?",
      "labels": [4],
      "options": [
        "By straddling both lanes.",
        "The left-hand lane.",
        "Either lane.",
        "The right-hand lane."
      ],
      "correct": 4,
      "answerContent": "When a driver approaches a roundabout where two lanes are provided, they should choose the most suitable one based on the road markings and the exit they intend to take off the roundabout. The left lane is generally used for vehicles exiting to the left (9 o'clock) or straight ahead (12 o'clock) and the right is for vehicles exiting at any exit after 12 o'clock."
    },
    {
      "id": 467,
      "content": "What position should a driver generally adopt on approach to a roundabout when intending to take the first exit to the left?",
      "labels": [4],
      "options": [
        "Approach in the right-hand lane.",
        "Approach in the left-hand lane.",
        "Approach by straddling both lanes.",
        "Approach in any lane available."
      ],
      "correct": 2,
      "answerContent": "When a driver intends to take any exit between the 6 o'clock and 12 o'clock positions they should generally approach the roundabout in the left lane unless road markings dictate otherwise."
    },
    {
      "id": 468,
      "content": "In general, when turning right on a two-way road, where should a driver position the vehicle?",
      "labels": [4],
      "options": [
        "At either side of the middle of the road.",
        "Just left of the middle of the road.",
        "At the far right-hand side of the road.",
        "At the far left-hand side of the road."
      ],
      "correct": 2,
      "answerContent": "In general, the correct position to be in before turning right is just left of the centre of the road. Where the road is wide enough, this position allows traffic coming from behind and going straight ahead to pass safely on the left. The driver should be alert for road markings which direct them to follow a certain course."
    },
    {
      "id": 469,
      "content": "What should a driver do before turning right from a major road into a minor road?",
      "labels": [4],
      "options": [
        "Commence turn in front of oncoming traffic as they must yield to traffic turning right.",
        "Stop and signal traffic to exit right from the minor road.",
        "Yield right of way to oncoming traffic and to pedestrians crossing at the junction.",
        "Stop and signal traffic to exit left from the minor road."
      ],
      "correct": 3,
      "answerContent": "The driver must yield to oncoming traffic and to pedestrians who are already crossing when turning right from a major road to a minor road."
    },
    {
      "id": 470,
      "content": "In general, which of the following should a driver do before entering a tunnel?",
      "labels": [4],
      "options": [
        "Ensure that dipped headlights are switched on.",
        "Switch on hazard warning lights to alert other traffic of their presence.",
        "Only use dipped headlights if there is other traffic in the tunnel.",
        "Ensure that full headlights are switched on."
      ],
      "correct": 1,
      "answerContent": "In general, a driver should switch on their dipped headlights before entering a tunnel."
    },
    {
      "id": 471,
      "content": "What should a driver do when entering a tunnel?",
      "labels": [4],
      "options": [
        "Drive closer to the vehicle in front.",
        "Keep a safe distance from the vehicle in front.",
        "Always switch off your radio to avoid distractions.",
        "Never drive below the posted speed limit."
      ],
      "correct": 2,
      "answerContent": "The driver should keep a safe distance from the vehicle in front remembering that they are entering a tunnel and tailgating could create an emergency. The minimum recommended safe distance for a car or motor cycle is 50\xA0metres and is 100\xA0metres for all other vehicles. Always remember the 2\xA0second rule."
    },
    {
      "id": 472,
      "content": "What should a driver do if there is very heavy traffic congestion in a tunnel?",
      "labels": [4],
      "options": [
        "Stop at the nearest emergency exit.",
        "Switch on hazard warning lights.",
        "Leave the vehicle.",
        "Keep close to the vehicle in front."
      ],
      "correct": 2,
      "answerContent": "If there is traffic congestion in a tunnel, you should switch on hazard lights and remain patient. Keep a safe distance from the vehicle in front even in slow-moving traffic. Listen for traffic messages on the tunnel radio station, if available."
    },
    {
      "id": 473,
      "content": "When stopped at traffic lights and the green light comes on but pedestrians are still crossing the road, what should a driver do?",
      "labels": [4],
      "options": [
        "Wait as long as necessary to enable them to complete the crossing.",
        "Sound the horn as a warning to them that lights have changed.",
        "Move forward to encourage them to complete the crossing quickly.",
        "Signal the pedestrians that the lights have changed and drive on."
      ],
      "correct": 1,
      "answerContent": "A green traffic light means you may go if the way is clear. If pedestrians are crossing, give way to them and let them safely cross before proceeding."
    },
    {
      "id": 474,
      "content": "What should a driver do when they see a slow moving vehicle up ahead being driven by a learner driver?",
      "labels": [4],
      "options": [
        "Overtake the vehicle as quickly as possible.",
        "Maintain a distance behind to avoid undue pressure.",
        "Drive close behind the vehicle to encourage the driver to pull in.",
        "Drive close behind the vehicle to show your intention to overtake."
      ],
      "correct": 2,
      "answerContent": "Show patience and courtesy when driving behind a learner driver. Learner drivers are not as experienced as other road users and may drive erratically when put under pressure."
    },
    {
      "id": 475,
      "content": "How is a learner driver likely to react in unusual traffic situations?",
      "labels": [4],
      "options": [
        "Slower than an experienced driver.",
        "Quicker than an experienced driver.",
        "In the same way as an experienced driver.",
        "Better than an experienced driver."
      ],
      "correct": 1,
      "answerContent": "You should be patient when driving behind a learner driver. Learners may not anticipate and react to unusual traffic situations as well as an experienced driver might."
    },
    {
      "id": 476,
      "content": "When negotiating junctions, which road users are particularly vulnerable?",
      "labels": [4],
      "options": [
        "Tractor Drivers.",
        "Minibus drivers.",
        "Van drivers.",
        "Motorcyclists."
      ],
      "correct": 4,
      "answerContent": "Drivers should be aware that no vehicle has an automatic right of way at a junction. Drivers must pay particular attention to vulnerable road users such as motorcyclists whose presence on the road may be less visible than other vehicle types due to their smaller size or obstructions."
    },
    {
      "id": 477,
      "content": "When stopped at traffic lights, a driver should take particular care for which road users coming up on their left?",
      "labels": [4],
      "options": [
        "Vans.",
        "Cyclists.",
        "Tractors.",
        "Cars."
      ],
      "correct": 2,
      "answerContent": "Before moving off at traffic lights and particularly when turning left you should be aware of cyclists and motorcyclists coming up on the left in general ? in particular where there is an advanced stop line for cyclists ahead of that for other road users."
    },
    {
      "id": 478,
      "content": "What should a driver do if the traffic light changes to green while pedestrians are still crossing at a pelican crossing?",
      "labels": [4],
      "options": [
        "Rev the engine to encourage them to hurry along.",
        "Sound the horn as a warning and proceed with care.",
        "Beckon them to cross as quickly as possible.",
        "Wait patiently until they have finished crossing."
      ],
      "correct": 4,
      "answerContent": "A green traffic light means you may go if the way is clear. If pedestrians are crossing at a pelican crossing, give way to them and let them safely cross before proceeding."
    },
    {
      "id": 479,
      "content": "In slow-moving city traffic, a driver should occasionally check their blind spots for which road users in particular?",
      "labels": [4],
      "options": [
        "Cyclists.",
        "Taxis.",
        "Vans.",
        "Cars."
      ],
      "correct": 1,
      "answerContent": "Drivers should be aware of and check blind spots before moving off and changing direction where appropriate. Cyclists can easily become hidden in a blind spot, and in slow-moving traffic, they might be moving faster than you are."
    },
    {
      "id": 480,
      "content": "At traffic lights a driver should take particular care for which road users coming up on the left side (nearside)?",
      "labels": [4],
      "options": [
        "Vans.",
        "Trucks.",
        "Cars.",
        "Motorcyclists."
      ],
      "correct": 4,
      "answerContent": "Before moving off at traffic lights you should be aware of motorcyclists unexpectedly coming up on the left hand side(nearside)."
    },
    {
      "id": 481,
      "content": "What should a driver do if, while driving, they see children on the road ahead?",
      "labels": [4],
      "options": [
        "Maintain your speed but be prepared to stop if necessary.",
        "Sound the horn and maintain speed.",
        "Turn on the headlights to warn the children of your presence.",
        "Reduce speed and be prepared to stop if necessary."
      ],
      "correct": 4,
      "answerContent": "Children can be unpredictable. When driving at a higher speed and children are present, drivers must expect the unexpected, slow down and be prepared to stop if necessary."
    },
    {
      "id": 482,
      "content": "What should a driver do when they see joggers ahead on the left?",
      "labels": [4],
      "options": [
        "Check the mirrors, indicate and overtake, allowing them sufficient clearance.",
        "Expect them to move in out of the driver's path.",
        "Indicate and overtake allowing sufficient clearance.",
        "Sound the horn and flash the lights to warn them of your presence."
      ],
      "correct": 1,
      "answerContent": "People on the road are more vulnerable than vehicles so you should treat them with extra care. If you see people jogging ahead, use the mirror/signal/manouevre routine and give plenty of clearance to the joggers when you are overtaking them."
    },
    {
      "id": 483,
      "content": "When driving on a road that has a potholed surface and there is a cyclist ahead, what should a driver do?",
      "labels": [4],
      "options": [
        "Expect the cyclist to keep to the left and maintain speed.",
        "Maintain course and sound the horn to alert the cyclist of their approach.",
        "Change to a lower gear and overtake quickly.",
        "Allow extra clearance in case the cyclist swerves to avoid a pothole."
      ],
      "correct": 4,
      "answerContent": "You should always be aware of how vulnerable cyclists are. When you are driving on a road with potholes or bad surfaces, give plenty of clearance to the cyclists when overtaking them. Take into account that they may swerve suddenly to avoid potholes."
    },
    {
      "id": 484,
      "content": "What should a driver be aware of when making a left turn into a side road?",
      "labels": [4],
      "options": [
        "Following traffic must have room to overtake.",
        "Cyclists may come up on the left (nearside).",
        "To approach as close to the kerb as possible.",
        "Cyclists might come up on the right (offside)."
      ],
      "correct": 2,
      "answerContent": "When turning left, drivers should be aware that cyclists and pedestrians may come up on the left (nearside) . Always check to your left (nearside) before you make a left turn."
    },
    {
      "id": 485,
      "content": "When driving on a country road without footpaths, what should a driver expect coming towards them on their side of the road?",
      "labels": [4],
      "options": [
        "Cyclists.",
        "Tractors.",
        "Pedestrians.",
        "Motorcyclists."
      ],
      "correct": 3,
      "answerContent": "Where there is no footpath, pedestrians are required to walk on the side of the on-coming traffic and drivers should be aware of this. Pedestrians are vulnerable road users so drivers should always be aware of their presence, especially on country roads."
    },
    {
      "id": 486,
      "content": "What should a driver do when driving at night on an unlit road?",
      "labels": [4],
      "options": [
        "Drive on the centre of the road.",
        "Drive close to the left to avoid oncoming traffic.",
        "Watch out for pedestrians wearing dark clothing.",
        "Drive as close as possible to the line of reflective studs."
      ],
      "correct": 3,
      "answerContent": "While driving at night and even with the best headlights, it can be very difficult to see all the hazards that you might come across ? for example, pedestrians wearing dark clothing. As always drivers should drive at a speed that will enable them to stop safely within the distance they can see to be clear ahead."
    },
    {
      "id": 487,
      "content": "What could happen if a driver parks on a footpath?",
      "labels": [4],
      "options": [
        "Traffic could be impeded.",
        "The tyres will lose air pressure.",
        "Pedestrians could be impeded.",
        "The suspension will be weakened."
      ],
      "correct": 3,
      "answerContent": "You should never park on a footpath. Pedestrians (including people with young children in pushchairs, prams and also wheelchair users) might have to go onto the road to get around your car, and this could put them in danger."
    },
    {
      "id": 488,
      "content": "What procedure should a driver follow when intending to overtake a cyclist travelling in the same direction up ahead?",
      "labels": [4],
      "options": [
        "Mirror check, indicate and move out if it is safe to do so.",
        "Mirror check, and move out to overtake without indicating.",
        "Indicate, move out and check the mirror for following traffic.",
        "Indicate, check the mirror, move out and overtake when safe to do so."
      ],
      "correct": 1,
      "answerContent": "The sequence drivers should follow the mirror - signal - manoeuvre routine when overtaking. Drivers should overtake only when it is safe to do so. Give extra space to cyclists when overtaking them, as they may need to move out to avoid a pothole, or they could be blown into your path on windy days."
    },
    {
      "id": 489,
      "content": "If a driver suspects that their vehicle indicators have not been seen, what should the driver do?",
      "labels": [4],
      "options": [
        "It is unnecessary to give signals provided observation is taken.",
        "Use a clear, decisive hand signal as well.",
        "The driver's position on the road is a sufficient enough signal.",
        "Shout your intentions out of the window."
      ],
      "correct": 2,
      "answerContent": "If the driver is concerned that for whatever reason the indicators are not giving an adequate signal, they should use clear decisive hand signals as well to advise other road users of their intention."
    },
    {
      "id": 490,
      "content": "What should a driver do when travelling on a country road with following traffic, and they meet pedestrians?",
      "labels": [4],
      "options": [
        "Signal their intention to overtake the pedestrians.",
        "Gesture to the pedestrians to move in off the road.",
        "Leave a minimum clearance of 30\xA0centimetres.",
        "Flash the lights to alert following traffic of a pedestrian on the road."
      ],
      "correct": 1,
      "answerContent": "When you are driving on a road without footpaths, drivers should take extra care when they come upon pedestrians on the road. When they intend to move out and overtake, they should check the mirrors and signal to following traffic in good time to alert drivers behind that they are changing direction because of the hazard ahead."
    },
    {
      "id": 491,
      "content": "When driving on dark winter mornings and evenings on unlit country roads, what should a driver be aware of?",
      "labels": [4],
      "options": [
        "An oncoming cyclist could never be dazzled by the vehicle lights and wobble off course into the driver's path.",
        "Cyclists are much more vulnerable in poor lighting conditions.",
        "On country roads, cyclists have space in the margin of the road so that a driver can overtake them without reducing speed or moving out.",
        "Cyclists all wear reflective belts, have the correct lighting on their bicycles and are clearly visible."
      ],
      "correct": 2,
      "answerContent": "Drivers should take extra care when driving on dark winter mornings and evenings ? vulnerable road users such as cyclists and pedestrians (particularly schoolchildren) might not be so easy to see in low light conditions."
    },
    {
      "id": 492,
      "content": "When driving on dark winter mornings and evenings on unlit country roads, what should a driver be aware of?",
      "labels": [4],
      "options": [
        "That there could be vulnerable pedestrians walking on the road.",
        "That the lack of light will not affect the driver's ability to see vulnerable pedestrians.",
        "That there will be no pedestrians walking on the road.",
        "That all pedestrians will be wearing reflective armbands and bright clothing."
      ],
      "correct": 1,
      "answerContent": "Drivers should take extra care when driving on dark winter mornings and evenings ? vulnerable road users such as cyclists and pedestrians (particularly schoolchildren) might not be so easy to see in low light conditions."
    },
    {
      "id": 493,
      "content": "When driving on dark winter mornings and evenings on unlit country roads, what should a driver be aware of?",
      "labels": [4],
      "options": [
        "That a driver should drive at all times with sidelights on in order to see pedestrians walking on unlit country roads.",
        "Schoolchildren are more vulnerable on unlit country roads on dark winter mornings and evenings.",
        "A driver should expect that pedestrians will be on the footpath and not be in danger of being hit.",
        "That the lack of light will not effect the driver's ability to see stray animals on the road."
      ],
      "correct": 2,
      "answerContent": "Drivers should take extra care when driving on dark winter mornings and evenings ? vulnerable road users such as cyclists and pedestrians (particularly schoolchildren) might not be so easy to see in low light conditions."
    },
    {
      "id": 494,
      "content": "What should a driver do if a front tyre bursts while driving?",
      "labels": [4],
      "options": [
        "Apply the handbrake immediately.",
        "Relax the hold on the steering wheel.",
        "Grip the steering wheel firmly.",
        "Brake firmly and quickly."
      ],
      "correct": 3,
      "answerContent": "If a front tyre bursts on a vehicle, the steering on the vehicle will become unstable. Don't panic ? slow down gradually while keeping a firm hold on the steering wheel. Stop in a safe place to change the wheel, and alert other road users by switching on your hazard warning lights."
    },
    {
      "id": 495,
      "content": "What precautions could a driver take against the risk of fire in their vehicle?",
      "labels": [4],
      "options": [
        "Use low-octane unleaded petrol in the vehicle.",
        "Avoid driving the vehicle with a full tank of fuel.",
        "Carry a suitable fire extinguisher in the vehicle.",
        "Keep all water levels filled to the maximum at all times."
      ],
      "correct": 3,
      "answerContent": "A strong smell of fuel is usually an indication that something is wrong, and you should stop and investigate as soon as possible. Leaking or spilling petrol can be dangerous because it is so combustible. It is good practice to carry a fire extinguisher in your vehicle, so that you can deal with any small fires"
    },
    {
      "id": 496,
      "content": "What should a driver do if their vehicle is broken down on a motorway and they are awaiting assistance?",
      "labels": [4],
      "options": [
        "Switch on the vehicle hazard warning lights, get out of the vehicle and stand safely to the side.",
        "Try to flag down other traffic from the rear of the vehicle for assistance.",
        "Get out of the vehicle and wait at the rear of it.",
        "Stand out on the roadway and direct traffic to pass."
      ],
      "correct": 1,
      "answerContent": "If your vehicle breaks down on the road, always switch on the hazard warning lights and stand clear of the vehicle while awaiting assistance ? this will warn other traffic that there is a vehicle stopped on the road."
    },
    {
      "id": 497,
      "content": "When a driver is at a junction where visibility is extremely limited, what should the driver do?",
      "labels": [4],
      "options": [
        "Move out with extreme care, watching carefully to the left and right.",
        "Sound the horn and quickly proceed.",
        "Seek help from a passer-by.",
        "Drive the front of the vehicle out onto the road to enable other drivers to see you."
      ],
      "correct": 1,
      "answerContent": "Where your view is obstructed at a junction, you should move carefully into a position where you can see, but without interfering with other road users. You should then assess the situation before you continue."
    },
    {
      "id": 498,
      "content": "When should a driver use the vehicle's rear view mirror?",
      "labels": [4],
      "options": [
        "Before changing direction.",
        "Before reversing only.",
        "Before switching on the rear demister.",
        "Before moving off only."
      ],
      "correct": 1,
      "answerContent": "You should use your mirrors to stay aware of traffic situations behind and around you. Always check your mirror before you change direction on a road, and before you signal or begin a manoeuvre."
    },
    {
      "id": 499,
      "content": "How should a driver proceed if their view is obstructed at a junction?",
      "labels": [4],
      "options": [
        "Ask a passer-by for guidance onto the other road.",
        "Move out slowly onto the road while watching carefully for other traffic.",
        "Sound the horn several times and proceed.",
        "Flash headlights on and off before moving out."
      ],
      "correct": 2,
      "answerContent": "At junctions where the view is obstructed, move carefully into a position where you can see without interfering with other road users. Then assess the situation before you continue."
    },
    {
      "id": 500,
      "content": "What should drivers do if they become drowsy while driving?",
      "labels": [4],
      "options": [
        "Stop and have a good meal to boost energy levels.",
        "Turn up the heating.",
        "Stop, take a break including a short walk if possible.",
        "Open a window or turn on the air conditioning to let cool air into the vehicle."
      ],
      "correct": 3,
      "answerContent": "Driving when you are tired can be very dangerous, and tiredness is one of the main causes of serious road collisions. If you become drowsy while driving, stop in a safe place and take a short nap. Then get some fresh air and stretch your legs for a few minutes before setting off again. Taking a caffeine-based drink such as coffee may also help."
    },
    {
      "id": 501,
      "content": "What should the driver do if they are driving and feel tired?",
      "labels": [4],
      "options": [
        "The driver should stop and take a break.",
        "The driver should increase speed so as to shorten the journey.",
        "The driver should drive along the centre of the road and reduce speed.",
        "The driver should drive on the hard shoulder where available."
      ],
      "correct": 1,
      "answerContent": "Driving when you are tired can be very dangerous, and it may cause you to micro-sleep (or nod off momentarily). At 100\xA0km/h you travel at 28\xA0metres a second, so if you micro-sleep for just 4\xA0seconds you would travel over 100\xA0metres without being in control of the vehicle. Never drive if you are fighting sleep."
    },
    {
      "id": 502,
      "content": "What should a driver do if they are behind schedule in reaching a destination at an appointed time?",
      "labels": [4],
      "options": [
        "Be patient and drive so as to arrive safely.",
        "Drive on the hard shoulder where available.",
        "Drive on smartly and overtake any vehicles preventing progress.",
        "Exceed the speed limit if necessary to make up the time."
      ],
      "correct": 1,
      "answerContent": "You should always drive at a speed that allows you to stop safely within the distance you can see to be clear. Being late for an appointment is no excuse for exceeding speed limits or for driving at an unsafe speed. Arrive alive."
    },
    {
      "id": 503,
      "content": "When is it permitted to force oncoming traffic onto the hard shoulder on the opposite side of the road while overtaking?",
      "labels": [4],
      "options": [
        "When the hard shoulder is wide enough.",
        "It is not permitted to force oncoming traffic onto the hard shoulder while overtaking.",
        "When none of the oncoming traffic is overtaking.",
        "When the vehicle being overtaken is driving too slow."
      ],
      "correct": 2,
      "answerContent": "Overtaking in the manner described here is dangerous. You should overtake another vehicle only when it is safe to do so, both for you and for all other traffic. Before you overtake, make sure the road ahead is clear and that you have enough room to complete the overtaking manoeuvre and return to your own side of the road without forcing any other road user to alter speed or course."
    },
    {
      "id": 504,
      "content": "What should drivers do if they approach road works and there is earth-moving machinery moving about?",
      "labels": [4],
      "options": [
        "Reduce speed as there may be loose gravel or mud on the road.",
        "Switch on headlights as a warning and carry on as normal.",
        "Stop, turn the vehicle around on the road and find an alternative route.",
        "Sound the horn and maintain normal speed."
      ],
      "correct": 1,
      "answerContent": "Where earth-moving machinery is working, there are likely to be mud and gravel deposits on the road. Also the noise of such machines might make it hard for road workers to hear the approaching traffic. When you come across earth-moving machinery, slow down and proceed with extreme caution."
    },
    {
      "id": 505,
      "content": "Which of the following affects the braking distance of a vehicle?",
      "labels": [4],
      "options": [
        "The power of the engine.",
        "The use of unleaded fuel.",
        "The speed and weight of the vehicle.",
        "The brake-pad clearance."
      ],
      "correct": 3,
      "answerContent": "The overall stopping distance of your vehicle depends on its speed and weight ? faster and heavier vehicles require greater stopping distances."
    },
    {
      "id": 506,
      "content": "What should a driver do when driving in dense fog?",
      "labels": [4],
      "options": [
        "Reduce speed and use dipped headlights.",
        "Drive along the hard shoulder and watch for the reflective markers.",
        "Reduce speed and use full headlights.",
        "Drive along the central dividing line and watch for the reflective markings."
      ],
      "correct": 1,
      "answerContent": "In dense fog you should reduce your speed and use dipped headlights and fog lights (where fitted). Sidelights are not strong enough in fog, and full headlights can reflect off the fog and make it harder to see where you are going."
    },
    {
      "id": 507,
      "content": "When driving at night, when must a driver dip the vehicle's full headlights?",
      "labels": [4],
      "options": [
        "When entering a motorway.",
        "When there is no oncoming traffic.",
        "When driving at less than 50\xA0km/h.",
        "When meeting or driving behind other traffic."
      ],
      "correct": 4,
      "answerContent": "When driving at night you should dip your headlights when you meet oncoming vehicles so that you do not dazzle them. And you should also dip your headlights when you are driving behind another vehicle so the driver is not dazzled by your lights in their mirror."
    },
    {
      "id": 508,
      "content": "What does a 2-plus-1 road have?",
      "labels": [4],
      "options": [
        "Two non-motorway lanes in one direction and one non-motorway lane in the opposite direction.",
        "Two motorway lanes in one direction and one non-motorway lane in the opposite direction.",
        "Two non-motorway lanes and one motorway lane in two directions.",
        "Two motorway lanes and one non-motorway lane in two directions."
      ],
      "correct": 1,
      "answerContent": "A 2-plus-1 road consists of two lanes in one direction of travel and one lane in the other direction. The two-lane section allows for safe overtaking and alternates with a one-lane section roughly every 2\xA0kilometres."
    },
    {
      "id": 509,
      "content": "Where may a driver overtake on a 2-plus-1 road?",
      "labels": [4],
      "options": [
        "In the two-lane stretch.",
        "In the one-lane stretch if there is no oncoming traffic.",
        "In the one-lane stretch.",
        "In either the one-lane stretch or the two-lane stretch."
      ],
      "correct": 1,
      "answerContent": "A 2-plus-1 road consists of two lanes in one direction of travel and one lane in the other direction. When you need to overtake, you should wait until you reach the 2-lane section which occurs approximately every 2\xA0kilometres."
    },
    {
      "id": 510,
      "content": "In what direction should a driver turn when entering a roundabout?",
      "labels": [4],
      "options": [
        "To the right.",
        "To either left or right.",
        "To the right when controlled by a traffic light.",
        "To the left."
      ],
      "correct": 4,
      "answerContent": "By law you must enter a roundabout by turning to the left and giving way to traffic already on the roundabout."
    },
    {
      "id": 511,
      "content": "What should a driver do if traffic comes to a halt in a tunnel?",
      "labels": [4],
      "options": [
        "Select a low gear and keep the engine running.",
        "Reverse out of the tunnel.",
        "Switch on front and rear fog lights.",
        "Switch off the engine."
      ],
      "correct": 4,
      "answerContent": "If traffic comes to a halt in a tunnel, switch off your engine to prevent a build up of fumes in the tunnel. Stay patient and follow the instructions of the tunnel operators."
    },
    {
      "id": 512,
      "content": "What should a driver do if their vehicle breaks down or they are involved in a collision in a tunnel?",
      "labels": [4],
      "options": [
        "Switch on hazard warning lights and walk to emergency station to call for help.",
        "Signal all other traffic to stop.",
        "Switch off all lights and remain in vehicle until help arrives.",
        "Beckon other traffic to overtake."
      ],
      "correct": 1,
      "answerContent": "If your vehicle breaks down or is involved in a collision in a tunnel, switch on your hazard warning lights, switch off your engine, go to an emergency station and use the emergency phone to alert the tunnel operator."
    },
    {
      "id": 513,
      "content": "At road junctions, what type of road users are particularly vulnerable?",
      "labels": [4],
      "options": [
        "Car drivers.",
        "Pedestrians.",
        "Tractor drivers.",
        "Van drivers."
      ],
      "correct": 2,
      "answerContent": "Vehicles do not have an automatic right of way at junctions. As a driver you should pay particular attention to vulnerable road users such as pedestrians, cyclists and motorcyclists and be aware that they are entitled to use the road in safety."
    },
    {
      "id": 514,
      "content": "What should a driver do to avoid the need for harsh braking?",
      "labels": [4],
      "options": [
        "Drive with one foot resting on the clutch pedal.",
        "Drive with cruise control engaged.",
        "Look ahead and anticipate what others may do.",
        "Drive with one foot resting on the brake pedal."
      ],
      "correct": 3,
      "answerContent": "You should know what speed you're travelling at and you should always drive at a speed that is appropriate to the conditions you are driving in, and you should be able to stop smoothly and safely within the distance you can see to be clear ahead."
    },
    {
      "id": 515,
      "content": "What should a driver do to ensure better fuel efficiency from their vehicle?",
      "labels": [4],
      "options": [
        "Ensure that the vehicle is regularly serviced.",
        "Ensure any load carried is equally distributed on the vehicle.",
        "Drive at higher speeds in order to reduce the time spent on the road.",
        "Ensure that heavier items are carried at the rear of the vehicle."
      ],
      "correct": 1,
      "answerContent": "One of the keys to good fuel efficiency is making sure that your vehicle is well maintained. Servicing should be carried out as recommended by the manufacturer. Checking the tyre pressure regularly can also help ensure good fuel efficiency."
    },
    {
      "id": 516,
      "content": "In what way do motor vehicles harm the environment?",
      "labels": [4],
      "options": [
        "By increasing radon levels.",
        "By decreasing radon levels.",
        "By decreasing carbon monoxide levels.",
        "By increasing carbon monoxide levels."
      ],
      "correct": 4,
      "answerContent": "Carbon monoxide is a poisonous gas emitted by vehicle exhausts into the atmosphere. Driving economically and keeping a vehicle well maintained can reduce the level of carbon monoxide emissions."
    },
    {
      "id": 517,
      "content": "What can be achieved by the driving style known as 'Eco-Driving??",
      "labels": [4],
      "options": [
        "Reduced fuel consumption.",
        "Reduced journey times.",
        "Increased journey times.",
        "Increased fuel consumption."
      ],
      "correct": 1,
      "answerContent": "The advantages of eco-driving include improved road safety, improved fuel consumption and reduced emissions. The eco-conscious driver becomes a more efficient driver because they learn to read the road further ahead and display better anticipation skills. This reduces the need for harsh acceleration and braking which results in a more economical style of driving and a smoother drive."
    },
    {
      "id": 518,
      "content": "Which action contributes to Eco-Driving?",
      "labels": [4],
      "options": [
        "Driving in a low gear at high speed.",
        "Fitting a roof rack.",
        "Selecting a high gear as soon as possible.",
        "Braking harshly."
      ],
      "correct": 3,
      "answerContent": "Eco-driving contributes to road safety and also reduces fuel consumption and harmful emissions. Eco-conscious drivers will read the road well in advance and avoid harsh acceleration and braking. Fuel consumption can be reduced by using the highest gear possible without causing the engine to labour."
    },
    {
      "id": 519,
      "content": "How can a driver help the environment?",
      "labels": [4],
      "options": [
        "By reducing speed.",
        "By braking harshly.",
        "By increasing speed.",
        "By harsh acceleration."
      ],
      "correct": 1,
      "answerContent": "As a driver you can do less damage to the environment if you drive smoothly and avoid harsh acceleration and braking. Vehicles travelling at 110\xA0km/h use up to 30% more fuel than those travelling at 80\xA0km/h. However, you should not drive so slow as to inconvenience other road users."
    },
    {
      "id": 520,
      "content": "What should a driver do if their vehicle gets a puncture on a motorway?",
      "labels": [4],
      "options": [
        "Stop in the traffic lane and switch on the hazard warning lights.",
        "Pull in where safe on the hard shoulder and call for assistance.",
        "Stop in the hard shoulder and get a passenger to warn traffic.",
        "Drive on to the next service area and get assistance."
      ],
      "correct": 2,
      "answerContent": "Don't try to change a wheel on a motorway, as this could be very dangerous. Drive the car on to the hard shoulder, and when it is safe to do so, get out of the vehicle and move behind the barrier. Call for assistance from a motorway emergency phone or using a mobile phone (call the Garda\xED)."
    },
    {
      "id": 521,
      "content": "When should a driver use hazard warning lights on a motorway?",
      "labels": [4],
      "options": [
        "When driving on the hard shoulder.",
        "When the vehicle is towing a trailer.",
        "When another vehicle is following too closely.",
        "When the vehicle has broken down."
      ],
      "correct": 4,
      "answerContent": "If your vehicle breaks down on a motorway, drive it to the hard shoulder and switch on the hazard warning lights to warn following traffic. When it is safe to do so, get out of the vehicle and move behind the barrier. Call for assistance from a motorway emergency phone or using a mobile phone (call the Garda\xED)."
    },
    {
      "id": 522,
      "content": "What should a driver do when they see road works machinery with amber flashing lights up ahead?",
      "labels": [4],
      "options": [
        "Do a U-turn, as the road ahead is blocked.",
        "Slow down and engage 1st gear.",
        "Continue at the same speed along the road.",
        "Slow down and prepare to stop if necessary."
      ],
      "correct": 4,
      "answerContent": "When you notice works vehicles ahead, slow down and be prepared to stop for the road works. Be extra careful driving through road works as the road surface could be uneven or slippery."
    },
    {
      "id": 523,
      "content": "What action should a driver take when they meet a vehicle with flashing blue lights?",
      "labels": [4],
      "options": [
        "Switch on the vehicle hazard warning lights.",
        "Flash the headlights and drive up onto the footpath on the left.",
        "Move to the left, reduce speed and stop if necessary.",
        "Flash the headlights and come to an immediate stop."
      ],
      "correct": 3,
      "answerContent": "When a driver notices an emergency vehicle approaching in the distance, they should check their mirror and move to the left to allow the vehicle to pass. On some occasions it may be necessary to stop."
    },
    {
      "id": 524,
      "content": "What should a driver do if an ambulance is stopped up ahead with its flashing blue lights on?",
      "labels": [4],
      "options": [
        "Stop immediately to see what is happening.",
        "Move to the centre of the road to stop other vehicles from overtaking.",
        "Stop and offer assistance.",
        "Reduce speed and prepare to stop if necessary."
      ],
      "correct": 4,
      "answerContent": "When you come upon an emergency vehicle stopped on the road, you should slow down and be prepared to stop. Do not stop to see what is happening as this could be dangerous and you might cause an obstruction to the flow of traffic."
    },
    {
      "id": 525,
      "content": "When are children allowed to stand with their heads up through an open sun roof?",
      "labels": [4],
      "options": [
        "When they are aged more than 12\xA0years.",
        "When travelling at speeds below 30\xA0km/h.",
        "Children are never allowed to do so.",
        "When they are wearing eye protection."
      ],
      "correct": 3,
      "answerContent": "When carrying children in a car or goods vehicle, it is the drivers responsibility to make sure that they are suitably restrained."
    },
    {
      "id": 526,
      "content": "When may the holder of a Category W learner permit carry a passenger on a tractor or works vehicle?",
      "labels": [4],
      "options": [
        "When there is proper passenger seating and the passenger holds a full Category W licence.",
        "When the passenger holds a full Category M licence and has personal insurance cover.",
        "When the passenger has personal insurance cover.",
        "When there is a need for their assistance."
      ],
      "correct": 1,
      "answerContent": "The holder of a Category W licence may carry a passenger in the vehicle only if: 1. the vehicle is designed to take a passenger, and 2. the passenger has held a full driving licence in Category W for two or more years."
    },
    {
      "id": 527,
      "content": "Are children allowed to be left unattended in a vehicle?",
      "labels": [4],
      "options": [
        "Only when the vehicle is parked in a supervised car park.",
        "Only when the vehicle is not parked on a hill.",
        "Children should never be left unattended in a vehicle.",
        "Only when there is adequate ventilation."
      ],
      "correct": 3,
      "answerContent": "Children must not be left unattended in a vehicle, even for a short period of time. Children might interfere with the vehicles controls, and would not be able to deal with an emergency situation, such as a fire or electrical malfunction which could result in serious injury or death."
    },
    {
      "id": 528,
      "content": "When is a red flag a sufficient marker for a rear load overhang that exceeds one metre?",
      "labels": [4],
      "options": [
        "Only during the night.",
        "At no time.",
        "At all times.",
        "Only during the day."
      ],
      "correct": 4,
      "answerContent": "During daylight hours, you must use a red flag to mark any load that is protruding more than one metre. At night, you must use a red light."
    },
    {
      "id": 529,
      "content": "How should a driver negotiate a bend when driving a fully loaded vehicle?",
      "labels": [4],
      "options": [
        "At the same speed as when empty.",
        "By taking the bend more sharply than when empty.",
        "At a slower speed than when empty.",
        "At a faster speed than when empty."
      ],
      "correct": 3,
      "answerContent": "Driving too fast on the approach to a bend and while driving through it with a fully loaded vehicle can lead to a loss of control. This can be prevented by driving in a safe and sensible manner and by reading the road ahead."
    },
    {
      "id": 530,
      "content": "When is a driver allowed to carry more passengers in a car than there are seat belts available?",
      "labels": [4],
      "options": [
        "It is never allowed.",
        "When the driver's visibility is not interfered with.",
        "When the driver has the appropriate insurance cover.",
        "It is always allowed."
      ],
      "correct": 1,
      "answerContent": "A driver must make sure that each passenger in the vehicle has a seatbelt. Failure to wear a seatbelt is an offence. It is the drivers responsibility to ensure that passengers under the age of 17 wear seatbelts. Older passengers are themselves responsible for wearing seatbelts."
    },
    {
      "id": 531,
      "content": "At what point is a vehicle load more likely to shift?",
      "labels": [4],
      "options": [
        "When reversing.",
        "When overtaking.",
        "When cornering.",
        "When braking gently."
      ],
      "correct": 3,
      "answerContent": "It is the drivers responsibility to ensure that the load is properly secured and evenly distributed, so that the vehicle can be properly controlled when changing direction and when braking."
    },
    {
      "id": 532,
      "content": "When driving a tractor and trailer, what should the driver do on entering a roundabout to avoid possible roll-over?",
      "labels": [4],
      "options": [
        "Drive in a high gear.",
        "Reduce speed.",
        "Engage the parking brake.",
        "Increase speed."
      ],
      "correct": 2,
      "answerContent": "When you are driving a tractor with a trailer, you need to take extra care because of the vehicles instability. Always drive at a safe speed, in particular when changing direction, such as on a roundabout."
    },
    {
      "id": 533,
      "content": "When is jack-knifing most likely to occur?",
      "labels": [4],
      "options": [
        "When the trailer springs are over-greased.",
        "When travelling sideways across a slope.",
        "When travelling uphill.",
        "When trying to reduce speed sharply while travelling downhill."
      ],
      "correct": 4,
      "answerContent": "Towing a trailer or caravan dramatically reduces the stability of the towing vehicle. If a driver brakes sharply or slows down quickly, the trailer may pivot around the tow hitch coupling, causing both vehicles to go off course, and possibly overturn."
    },
    {
      "id": 534,
      "content": "How should a driver secure their vehicle before getting out of it?",
      "labels": [4],
      "options": [
        "Apply the parking brake, stop the engine and engage a low gear.",
        "Angle the wheels away from the kerb and stop the engine.",
        "Angle the wheels towards the kerb and stop the engine.",
        "Engage a low gear and stop the engine."
      ],
      "correct": 1,
      "answerContent": "Before leaving your vehicle, apply the handbrake, switch off the engine and engage a low gear. If the vehicle is fitted with automatic transmission, select P (park)."
    },
    {
      "id": 535,
      "content": "What should a driver do if a tyre bursts on the vehicle they are driving?",
      "labels": [4],
      "options": [
        "Continue at the normal speed and stop at the next garage.",
        "Pull on the handbrake to bring the vehicle to a stop.",
        "Apply the brakes as quickly as possible.",
        "Hold the steering wheel firmly and pull in on the side of the road."
      ],
      "correct": 4,
      "answerContent": "If a tyre bursts on your vehicle, keep a firm hold of the steering, slow down gradually and stop where it is safe to do so. Switch on the hazard warning lights."
    },
    {
      "id": 536,
      "content": "What should a driver do if their vehicle gets into a front-wheel sideways skid?",
      "labels": [4],
      "options": [
        "Release the accelerator.",
        "Press the footbrake.",
        "Continue to accelerate.",
        "Apply the handbrake."
      ],
      "correct": 1,
      "answerContent": "If your vehicle goes into a front-wheel sideways skid, release the accelerator and do not try to steer until the tyres regain some grip on the road."
    },
    {
      "id": 537,
      "content": "What should a driver do if their vehicle gets into a rear-wheel sideways skid?",
      "labels": [4],
      "options": [
        "Turn the steering wheel in the same direction as the rear wheels are heading.",
        "Apply the footbrake to bring the vehicle to a halt.",
        "Apply the handbrake to bring the vehicle to a halt.",
        "Turn the steering wheel in the same direction as the front wheels are heading."
      ],
      "correct": 1,
      "answerContent": "If your vehicle goes into a rear-wheel sideways skid, turn the steering in the direction the rear wheels are heading. This should be done very gradually, as too much steering could cause the vehicle to skid in the opposite direction."
    },
    {
      "id": 538,
      "content": "What should a driver do if they get a tyre blow-out on the road?",
      "labels": [4],
      "options": [
        "Apply the handbrake immediately to bring the vehicle to a halt.",
        "Continue driving until they reach a garage.",
        "Switch off the engine ignition to bring the vehicle to a halt.",
        "Apply the footbrake gently and bring the vehicle to a halt."
      ],
      "correct": 4,
      "answerContent": "If a tyre on the vehicle you are driving blows out, slow down gradually and find a safe and suitable place to stop. Switch on your hazard warning lights and change the wheel or call for assistance."
    },
    {
      "id": 539,
      "content": "What action should a driver take if the engine in their vehicle cuts out suddenly when they are driving along?",
      "labels": [4],
      "options": [
        "Check the handbrake is fully off.",
        "Engage a lower gear.",
        "Depress the accelerator and then release it.",
        "Signal and steer the vehicle to the side of the road."
      ],
      "correct": 4,
      "answerContent": "If the engine in the vehicle you are driving cuts out, signal and steer to the side of the road. Switch on the hazard warning lights and contact the relevant breakdown service to get assistance."
    },
    {
      "id": 540,
      "content": "How would hydraulic power steering be affected if an engine stalled in slow-moving traffic?",
      "labels": [4],
      "options": [
        "The steering fluid reservoir would lose all its fluid.",
        "The steering wheel would automatically lock.",
        "The steering would become heavy and difficult to operate.",
        "The steering would become much lighter and easier to operate."
      ],
      "correct": 3,
      "answerContent": "Hydraulic power steering is operated by a pump which is driven by the engine. If the engine stalls, the pump stops working, and the steering becomes heavy and requires much more effort to turn."
    },
    {
      "id": 541,
      "content": "What should a driver do to avoid having to make an emergency stop?",
      "labels": [4],
      "options": [
        "Keep the left hand available to apply the handbrake.",
        "Drive with the left foot covering the brake pedal.",
        "Drive with the left foot covering the clutch pedal.",
        "Keep a safe distance from the vehicle in front."
      ],
      "correct": 4,
      "answerContent": "When driving in traffic, read the road ahead and keep a safe distance from the vehicle in front. Use the two-second rule to determine your safe distance from the vehicle in front."
    },
    {
      "id": 542,
      "content": "What should a driver do to avoid having to make an emergency stop?",
      "labels": [4],
      "options": [
        "Keep the left hand available to apply the handbrake.",
        "Drive with the left foot covering the clutch pedal.",
        "Drive with the left foot covering the brake pedal.",
        "Scan the road well ahead."
      ],
      "correct": 4,
      "answerContent": "When driving in traffic, read the road ahead and keep a safe distance from the vehicle in front. Use the two-second rule to determine your safe distance from the vehicle in front."
    },
    {
      "id": 543,
      "content": "What should a driver do if their vehicle breaks down in a tunnel?",
      "labels": [4],
      "options": [
        "Walk to the end of the tunnel and call the Garda\xED.",
        "Use the emergency telephone to call for help.",
        "Wait in the vehicle until help arrives.",
        "Flag down a passing motorist and ask for help."
      ],
      "correct": 2,
      "answerContent": "If your vehicle breaks down or is involved in a collision in a tunnel, switch on your hazard warning lights, switch off your engine, go to an emergency station and use the emergency phone to alert the tunnel operator."
    },
    {
      "id": 544,
      "content": "What advice should a driver give to passengers before opening doors?",
      "labels": [4],
      "options": [
        "Make sure that you have proper clothing protection on.",
        "Check all around and open door with caution.",
        "Remove seat belt and exit vehicle immediately.",
        "Leave windows slightly open to allow circulation of air."
      ],
      "correct": 2,
      "answerContent": "Before opening any doors, check for other road users nearby, in particular motorcyclists and pedestrians"
    },
    {
      "id": 545,
      "content": "How do you make sure your vehicle is parked safely?",
      "labels": [4],
      "options": [
        "Avoid reversing your vehicle into a space.",
        "Drive into parking space as quickly as possible.",
        "Don't park it where it may endanger other road users.",
        "Park your vehicle opposite another vehicle on a narrow road."
      ],
      "correct": 3,
      "answerContent": "When parking make sure you do not interfere with normal traffic flow and that your vehicle does not disturb, block or endanger other road users."
    },
    {
      "id": 546,
      "content": "What should be considered when reversing out of a parking space?",
      "labels": [4],
      "options": [
        "Check behind using interior rear view mirror only.",
        "Always reverse quickly to get out of space.",
        "Avoid switching on your rear wiper.",
        "Check for pedestrians and vehicles all around."
      ],
      "correct": 4,
      "answerContent": "Some car parks are designed for you to park forwards to make it easier to load shopping. In these cases take extra care as you reverse out of the parking space because pedestrians and vehicles may pass behind you."
    },
    {
      "id": 547,
      "content": "What should a driver do if their vehicle goes on fire in a tunnel?",
      "labels": [4],
      "options": [
        "Drive to the nearest emergency station.",
        "Drive to the nearest fire exit.",
        "Leave the vehicle and use the fire extinguishers provided in the tunnel to extinguish the fire.",
        "Leave the vehicle and follow the emergency escape route."
      ],
      "correct": 4,
      "answerContent": "If your vehicle goes on fire in a tunnel, you should stop the vehicle as soon as possible, evacuate any passengers to a safe place, go to an emergency station and use the emergency phone to alert the tunnel operator."
    },
    {
      "id": 548,
      "content": "According to the Pre-Crash Report, which gender was more likely to drink and drive and be involved a fatal collision?",
      "labels": [4],
      "options": [
        "Males and females drink drive equally",
        "Females",
        "Neither males or females drink drive",
        "Males"
      ],
      "correct": 4,
      "answerContent": "As a proportion of all 867 fatal collisions analysed, 38% cited alcohol as the main contributory factor. Of this number, 29% involved at least one driver or motorcyclist with a record of alcohol consumption prior to the collision. This highlights the fact that a high level of drink driving is still evident in Ireland. FACT: All of these drivers were deemed culpable or part culpable for the collision through their behaviour on the road prior to the collision."
    },
    {
      "id": 549,
      "content": "According to the Pre-Crash Report, what type of vehicle were the majority of people driving when they had consumed alcohol and caused a fatal collision?",
      "labels": [4],
      "options": [
        "Motorcycle",
        "Tractor",
        "Van",
        "Private Car"
      ],
      "correct": 4,
      "answerContent": "All 28 of the female drivers who had consumed alcohol were driving a private car. Table 2 sets out the age band of the driver who had consumed alcohol by the vehicle driven. The group of Agricultural vehicles includes tractors. FACT: Almost half of the drivers of a private car were aged between 16 and 24\xA0years."
    },
    {
      "id": 550,
      "content": "According to the Pre-Crash Report, what type of fatal collision was a person more likely to be involved in when drink driving?",
      "labels": [4],
      "options": [
        "Single-vehicle collision",
        "Pedestrian collision",
        "Cyclist collision",
        "Multiple-vehicle collision"
      ],
      "correct": 1,
      "answerContent": "178 drink drivers were killed in a single vehicle collision and 24 were seriously injured. FACT: Forty nine passengers were travelling in the car with someone who had consumed alcohol and were killed."
    },
    {
      "id": 551,
      "content": "According to the Pre-Crash Report, which days of the week were people more likely to drink and drive and cause a fatal collision?",
      "labels": [4],
      "options": [
        "Thursday and Friday",
        "Sunday and Monday",
        "Saturday and Sunday",
        "Friday and Saturday"
      ],
      "correct": 3,
      "answerContent": "Drink driving is dangerous regardless of when it takes place. Unfortunately, some drivers will drink on any day so we must always stay alert and expect the unexpected. FACT: Currently the evidence shows us that Saturday and Sunday were the most frequent days of collisions. Fifty seven percent of the motorcyclists crashed on a Sunday compared to 29% of the drivers."
    },
    {
      "id": 552,
      "content": "What is the maximum disqualification period imposed in court where the learner driver has a blood alcohol concentration (BAC) level in excess of 80\xA0mg?",
      "labels": [4],
      "options": [
        "Six years",
        "Two years",
        "Four years",
        "One year"
      ],
      "correct": 1,
      "answerContent": "Where a learner driver has failed to pay a fixed penalty notice they will be summonsed to court where a judge can apply a disqualification period of between 1-6\xA0yrs."
    },
    {
      "id": 553,
      "content": "According to the Pre-Crash Report, which age group had the highest number of drivers causing fatal collisions where alcohol was a factor?",
      "labels": [4],
      "options": [
        "35-49\xA0years",
        "16-24\xA0years",
        "50-64\xA0years",
        "25-34\xA0years"
      ],
      "correct": 2,
      "answerContent": "Table 8 sets out the available blood alcohol concentrate (BAC) in drivers by the age group. In total 151 drivers had a record of a BAC. FACT: In total, 47% of the drivers aged between 16 and 24\xA0years had a BAC of 201 to 251+."
    },
    {
      "id": 554,
      "content": "A driver is automatically disqualified from driving for how long if, on a first offence, they refused to provide a member of An Garda S\xEDoch\xE1na with a sample of blood, urine or breath?",
      "labels": [4],
      "options": [
        "2\xA0years",
        "4\xA0years",
        "3\xA0years",
        "1\xA0year"
      ],
      "correct": 2,
      "answerContent": "It is an offence not to comply with a request from a member of An Garda S\xEDoch\xE1na to provide to provide a sample of breath, urine or blood."
    },
    {
      "id": 555,
      "content": "According to the Pre-Crash Report, what age group had the highest number of passenger deaths in collisions where alcohol was a factor?",
      "labels": [4],
      "options": [
        "25-34\xA0years",
        "10-16\xA0years",
        "17-24\xA0years",
        "50-65\xA0years"
      ],
      "correct": 3,
      "answerContent": "For a variety of reasons, including the young drivers likelihood to drink, when accompanied by peers, passengers in a vehicle driven by a younger driver (17-24\xA0yrs) are more likely to be killed."
    },
    {
      "id": 556,
      "content": "According to the Pre-Crash Report, what percentage of the 169 drivers killed in an alcohol related collision had consumed alcohol?",
      "labels": [4],
      "options": [
        "72%",
        "62%",
        "52%",
        "92%"
      ],
      "correct": 4,
      "answerContent": "FACT: During the period 2008-2012 a total of 169 drivers were killed of which 92% had consume alcohol prior to the crash. Other fatalities were Pedestrians, Passengers etc."
    },
    {
      "id": 557,
      "content": "According to the Pre-Crash Report, how many pedestrians were killed where alcohol consumption by the pedestrian was a factor?",
      "labels": [4],
      "options": [
        "Less than 10",
        "Between 20-40",
        "Between 41-90",
        "More than 100"
      ],
      "correct": 3,
      "answerContent": "FACT: During the period 2008-2012 a total of 80 pedestrians were killed where either the driver, the pedestrian or both had consumed alcohol prior to the collision."
    },
    {
      "id": 558,
      "content": "On a narrow busy road, what should pedestrians do when walking?",
      "labels": [4],
      "options": [
        "Walk in single file.",
        "Walk in groups of no more than three.",
        "Walk more than two abreast.",
        "Walk two abreast."
      ],
      "correct": 1,
      "answerContent": "Pedestrians should walk in single file on busy narrow roads. Drivers should be aware of the Rules of the Road for pedestrians, drive with caution and be prepared to react to any changes in the traffic situation."
    },
    {
      "id": 559,
      "content": "When should pedestrians wear reflective clothing at night?",
      "labels": [4],
      "options": [
        "At night, when walking outside built-up areas.",
        "When walking two abreast.",
        "When in urban areas.",
        "Only when it is raining."
      ],
      "correct": 1,
      "answerContent": "Outside built-up areas, pedestrians should wear reflective clothing at all times when walking at night. This is particularly important where there is no street lighting and no footpath for pedestrians."
    },
    {
      "id": 560,
      "content": "When should a driver use dipped headlights?",
      "labels": [4],
      "options": [
        "From 00:00\xA0hrs to 06:00\xA0hrs.",
        "When visibility is less than 300\xA0metres.",
        "When visibility is less than 200\xA0metres.",
        "From just after dusk to just before dawn."
      ],
      "correct": 4,
      "answerContent": "Lighting up hours are defined as the period of time during which drivers should turn on dipped headlights in order to be seen. This period normally starts half an hour after sunset and ends half an hour before sunrise."
    },
    {
      "id": 561,
      "content": "What lights should a vehicle show at dusk?",
      "labels": [4],
      "options": [
        "Daytime Running Lights (DRLs) only.",
        "Fog lights.",
        "Dipped headlights.",
        "Full headlights."
      ],
      "correct": 3,
      "answerContent": "Drivers need to see and be seen during all periods of low light levels ? for example, at dusk and dawn and in some bad weather conditions. At times of low light, you should turn on dipped headlights. The Road Safety Authority recommends that motorcyclists and drivers turn on their dipped headlights or daytime running lights during daylight hours."
    },
    {
      "id": 562,
      "content": "When may you pass another vehicle on the left-hand side?",
      "labels": [4],
      "options": [
        "When there is sufficient space to do so.",
        "When the vehicle in front is signalling to turn right or in slow moving lanes of traffic.",
        "A driver must never overtake on the left.",
        "When a driver cannot pass on the right-hand side because of oncoming traffic."
      ],
      "correct": 2,
      "answerContent": "Normally you must overtake on the right. There are, however, circumstances where you may overtake on the left ? for example, when the vehicle has moved out and signalled to turn right."
    },
    {
      "id": 563,
      "content": "If there is no footpath, where must a pedestrian walk?",
      "labels": [4],
      "options": [
        "There is no regulation.",
        "Right-hand side of the road.",
        "Left-hand side of the road.",
        "1\xA0metre from the edge of the road."
      ],
      "correct": 2,
      "answerContent": "Where there is no footpath provided, pedestrians should walk on the right-hand side of the road facing oncoming traffic. Drivers should be aware of the Rules of the Road for pedestrians, drive with caution and be prepared to react to any changes in the traffic situation."
    },
    {
      "id": 564,
      "content": "What should a driver do if they see a red warning triangle on the road?",
      "labels": [4],
      "options": [
        "The driver should stop and await instructions.",
        "The driver should remove the triangle as it is causing an obstruction on the road.",
        "The driver should maintain speed, carry on and avoid the triangle.",
        "The driver should slow down and expect a hazard up ahead."
      ],
      "correct": 4,
      "answerContent": "Warning triangles are used to alert approaching traffic that there is a vehicle breakdown or collision ahead. When you come across a warning triangle, you should slow down and be prepared to stop if necessary. Do not allow yourself to be distracted by the incident."
    },
    {
      "id": 565,
      "content": "What should drivers be aware of if they meet horses with riders on the road?",
      "labels": [4],
      "options": [
        "Drivers should be aware that horse riders are obliged to dismount and control their horses while traffic is passing.",
        "Drivers should be aware that all horse riders are experienced at handling horses.",
        "Drivers should be aware that loud noises from their vehicle may frighten the horses and cause them to bolt.",
        "Drivers should be aware that loud noises from their vehicle will not frighten the horses."
      ],
      "correct": 3,
      "answerContent": "You must know your responsibilities towards animal traffic on the road. Horses are easily startled and any sudden noises or activity could cause them to bolt."
    },
    {
      "id": 566,
      "content": "What should a driver do if there is a large oil spill on the road?",
      "labels": [4],
      "options": [
        "Maintain normal speed and try to straddle the spill with the wheels.",
        "Reduce speed by gently applying the brakes and switch on the hazard warning lights.",
        "Depress the clutch and brake sharply and switch on the hazard warning lights.",
        "Maintain normal speed in a lower gear and switch on hazard warning lights."
      ],
      "correct": 2,
      "answerContent": "Where oil is spilt on the road, your tyres will have reduced grip, and you might be at risk of skidding if you brake sharply. If you do come across oil on the road, brake gently and switch on your hazard warning lights for a short period to alert other traffic to the hazard."
    },
    {
      "id": 567,
      "content": "There are pedestrians on the footpath ahead and there are pools of water on the road. What should a driver do?",
      "labels": [4],
      "options": [
        "Sound the horn as a warning to the pedestrians and continue on.",
        "Reduce speed and try to avoid the pools of water so as not to splash the pedestrians.",
        "Flash the headlights as a warning to the pedestrians.",
        "Brake suddenly as you approach the pools of water."
      ],
      "correct": 2,
      "answerContent": "During wet conditions, you should be aware that surface water can affect the stability of your vehicle. This is particularly so where the water lies in pools. As you drive through surface water, you should show consideration to pedestrians and cyclists and try not to splash them as you pass."
    },
    {
      "id": 568,
      "content": "When preparing to stop, a driver notices the vehicle behind is towing a trailer. What should the driver do?",
      "labels": [4],
      "options": [
        "Indicate in good time and pull in gradually to allow the vehicle behind extra stopping distance.",
        "Stop quickly keeping a close eye on the rear-view mirror.",
        "Speed up temporarily to put distance between their vehicle and the vehicle behind.",
        "Use the handbrake to slow down and stop."
      ],
      "correct": 1,
      "answerContent": "When you are slowing down or stopping, you should be mindful of the type of vehicle that is following you. For example, if the vehicle following you is a large vehicle or one towing a trailer, you should think of indicating a little earlier than normal to allow the following vehicle enough time to react safely."
    },
    {
      "id": 569,
      "content": "The bus ahead is moving away from a bus stop. What should a driver do?",
      "labels": [4],
      "options": [
        "Try to get past it to avoid being delayed.",
        "Signal to the bus driver to let you pass.",
        "Slow down and allow it to move out.",
        "Drive alongside it because you have right of way."
      ],
      "correct": 3,
      "answerContent": "A driver should allow signalling buses back into the stream of traffic when they are moving out from a stop. Be careful of pedestrians getting on and off buses, particularly of children near schools."
    },
    {
      "id": 570,
      "content": "What should a driver do when being overtaken by another vehicle?",
      "labels": [4],
      "options": [
        "Increase speed.",
        "Continue at the same pace.",
        "Slow down quickly.",
        "Move to the right."
      ],
      "correct": 2,
      "answerContent": "When you are being overtaken by another vehicle, you should continue at the same pace but be alert in case the overtaking vehicle suddenly pulls back in front you."
    },
    {
      "id": 571,
      "content": "When should signals (for example, with indicators) be given to other road users?",
      "labels": [4],
      "options": [
        "When turning, except where road markings indicate your direction.",
        "Only when it is necessary to warn following traffic.",
        "Only when it is necessary to warn oncoming traffic.",
        "Clearly and in good time to let other road users know your intentions."
      ],
      "correct": 4,
      "answerContent": "Giving signals is a way of telling other road users what you intend to do. So, you should signal properly before moving off, turning right or left, changing lanes, overtaking, slowing down or stopping. Signal clearly and in good time, and keep in mind that giving a signal does not give you the right of way."
    },
    {
      "id": 572,
      "content": "What should the driver be able to see in the vehicle mirrors when they are properly adjusted?",
      "labels": [4],
      "options": [
        "The area behind and to each side of the vehicle.",
        "The passenger area of the vehicle.",
        "The position of all the wheels.",
        "The position of the left-side wheels."
      ],
      "correct": 1,
      "answerContent": "Properly adjusted vehicle mirrors enable drivers to see the road behind and to the sides. This helps drivers to take into account what's happening behind them, so that they can make informed, correct and safer decisions."
    },
    {
      "id": 573,
      "content": "What should the driver be able to see in the exterior mirrors of a vehicle when they are properly adjusted?",
      "labels": [4],
      "options": [
        "The sides of the vehicle only.",
        "The back of the vehicle only.",
        "The area to each side of the vehicle.",
        "60% angled to the vehicle and 40% to the road."
      ],
      "correct": 3,
      "answerContent": "Exterior mirrors enable drivers to see the area on each side of the vehicle. Drivers must take into account all visible hazards in order to make informed, correct and safer decisions."
    },
    {
      "id": 574,
      "content": "The vehicle's exterior mirrors are covered by a film of mud and dust. What should the driver do?",
      "labels": [4],
      "options": [
        "Continue on and clean them after reaching the destination.",
        "Drive in the slip stream of other traffic, as this will eventually clean the mirrors.",
        "Angle the mirrors towards the front for a distance in order to clean them.",
        "Clean them with a cloth or tissue before starting their journey."
      ],
      "correct": 4,
      "answerContent": "The purpose of mirrors is to increase the drivers view to the rear and sides of the vehicle and to enable them to take into account all visible hazards. Proper use will enable drivers to make informed, correct and safer decisions. Drivers should ensure that all mirrors, including the exterior ones, are clean and properly adjusted at all times to ensure optimum view."
    },
    {
      "id": 575,
      "content": "When a driver is making a left-hand turn, what mirrors should they particularly concentrate on?",
      "labels": [4],
      "options": [
        "The interior and right exterior mirror.",
        "The interior and left exterior mirror.",
        "The right exterior mirror.",
        "The interior mirror."
      ],
      "correct": 2,
      "answerContent": "When turning left, drivers should in particular be aware that cyclists and other vehicles may come up on their near side (left hand side). For that reason, when checking mirrors, it is particularly important to check both the left exterior and the interior mirror before turning. Drivers must always use the mirrors/signal/mirror/manouevre routine when turning. They should be particularly careful if crossing the path of a bus and/or cycle lane."
    },
    {
      "id": 576,
      "content": "What effect can wet weather have on a vehicle's exterior mirrors?",
      "labels": [4],
      "options": [
        "Water droplets can make the reflected object appear closer than it really is.",
        "Water droplets can obscure the reflected image.",
        "Water can cause a short-circuit in the electrically heated mirrors.",
        "Water droplets help to keep them clean."
      ],
      "correct": 2,
      "answerContent": "When driving in wet weather conditions, small water droplets can form on the glass of the exterior mirrors. This could make it more difficult to see the road behind and to the sides. Switch on the mirror demisters, if they are fitted. If necessary, stop and clear them."
    },
    {
      "id": 577,
      "content": "What does blue smoke coming from the vehicle's exhaust generally mean?",
      "labels": [4],
      "options": [
        "The engine is overheating.",
        "The catalytic converter is worn out.",
        "The engine is burning oil.",
        "The air filter needs to be replaced."
      ],
      "correct": 3,
      "answerContent": "A vehicle can give off blue smoke from the exhaust when it is burning oil. Poor maintenance and worn engines are typical causes. This blue smoke is harmful to the environment and may be costly. Drivers should have the vehicle checked by a competent person."
    },
    {
      "id": 578,
      "content": "What is the effect of a worn exhaust?",
      "labels": [4],
      "options": [
        "The filtering of fumes is reduced and engine noise is louder.",
        "Fuel efficiency is increased as the fumes escape more quickly.",
        "The engine overheats.",
        "Gear-changing is more difficult."
      ],
      "correct": 1,
      "answerContent": "A worn exhaust system can have a number of effects, including increased noise from the engine and more environmentally damaging fumes (as as they are not filtered properly). There are requirements to ensure vehicles are compliant with EU and Irish legislation. Vehicles are tested for compliance during road worthiness testing."
    },
    {
      "id": 579,
      "content": "What affect can a faulty exhaust system have?",
      "labels": [4],
      "options": [
        "It can improve the vehicle's fuel consumption.",
        "It can increase the vehicle's noise and pollution levels.",
        "It can reduce the vehicle's engine noise.",
        "It can increase wear on the vehicle's engine."
      ],
      "correct": 2,
      "answerContent": "A worn exhaust system can have a number of negative effects, including increased noise from the engine and more environmentally damaging fumes (as they are not filtered properly). There are requirements to ensure vehicles are compliant with EU and Irish legislation. Vehicles are tested for compliance during road worthiness testing."
    },
    {
      "id": 580,
      "content": "What is the purpose of a catalytic converter?",
      "labels": [4],
      "options": [
        "It allows the engine to quickly reach its normal operating temperature.",
        "It decreases engine power.",
        "It filters exhaust gases and reduces air pollution.",
        "It increases engine power."
      ],
      "correct": 3,
      "answerContent": "The purpose of a catalytic converter (CAT) is to remove toxic or polluting gases such as carbon monoxide, nitrogen oxide and unburned hydrocarbons from the exhaust emissions. When the CAT is faulty, an engine management warning light illuminates on the dashboard and drivers should seek advice from a competent person."
    },
    {
      "id": 581,
      "content": "How does harsh acceleration affect fuel consumption?",
      "labels": [4],
      "options": [
        "Fuel consumption increases.",
        "There is no effect if a high gear is engaged.",
        "Fuel consumption decreases.",
        "There is no effect provided the engine is properly tuned."
      ],
      "correct": 1,
      "answerContent": "Harsh acceleration increases fuel consumption. Smooth acceleration helps to reduce fuel consumption and the emissions from vehicles. Try not to over-rev the engine and use the appropriate gear for the speed of the vehicle. When slowing down, take your foot off the accelerator and allow the vehicle to slow progressively before you brake."
    },
    {
      "id": 582,
      "content": "What should a driver do to minimise fuel consumption in their vehicle?",
      "labels": [4],
      "options": [
        "Drive gently in a low gear.",
        "Use gentle acceleration and braking.",
        "Brake hard on approach to traffic lights to stop quickly.",
        "Use maximum acceleration between gear changes."
      ],
      "correct": 2,
      "answerContent": "Driving smoothly will help reduce fuel consumption. Read the road ahead and adjust speed in good time, and avoid harsh acceleration and late braking."
    },
    {
      "id": 583,
      "content": "How does continuous high-speed driving affect fuel consumption?",
      "labels": [4],
      "options": [
        "It reduces fuel consumption.",
        "It reduces fuel consumption as long as the road is straight.",
        "It increases fuel consumption.",
        "It uses the same consumption of fuel as lower speed driving."
      ],
      "correct": 3,
      "answerContent": "Driving at continuous high speeds increases your fuel consumption. Vehicles driving at 112\xA0km/h consumes approximately 30% more fuel than a vehicle travelling at 80\xA0km/h"
    },
    {
      "id": 584,
      "content": "How can fuel efficiency be improved?",
      "labels": [4],
      "options": [
        "By using an anti-waxing agent only in freezing conditions.",
        "By driving the vehicle in a lower gear for as long as possible.",
        "By using gentle acceleration and making gear changes appropriate to speed.",
        "By accelerating hard up through the gears to reach the desired speed as quickly as possible."
      ],
      "correct": 3,
      "answerContent": "A driver can contribute to their vehicles fuel efficiency by reading the road ahead and driving smoothly. This is achieved by accelerating gently, using the most appropriate gear for the speed they are travelling at and avoiding harsh braking."
    },
    {
      "id": 585,
      "content": "What effect does a worn exhaust have on a vehicle?",
      "labels": [4],
      "options": [
        "It causes the water coolant to leak from the engine.",
        "It causes noise and gas pollution levels to increase.",
        "It decreases fuel consumption.",
        "It causes oil to leak on the road."
      ],
      "correct": 2,
      "answerContent": "A vehicle with a worn exhaust will probably be noisier and will produce more polluting emissions. There are strict regulations governing the noise and emission levels of vehicles, and these are rigorously checked during a vehicle's NCT."
    },
    {
      "id": 586,
      "content": "When is the use of the horn prohibited?",
      "labels": [4],
      "options": [
        "Between 11:30\xA0pm and 6:00\xA0am on any road.",
        "Between 11:30\xA0pm and 7:00\xA0am in a built-up area.",
        "At all times in a built-up area.",
        "Between 10:00\xA0pm and 6:00\xA0am in a built-up area."
      ],
      "correct": 2,
      "answerContent": "Drivers are not permitted to sound the horn in a built-up area between 11:30\xA0pm and 7:00\xA0am unless there is a traffic emergency. Only sound the horn to warn other road users of oncoming danger or if they need to be made aware of your presence for safety reasons. Sounding the horn does not give the driver an automatic right of way. Never sound the horn to provoke a reaction from or to rebuke another motorist."
    },
    {
      "id": 587,
      "content": "What can a driver do to maximise fuel efficiency while driving?",
      "labels": [4],
      "options": [
        "Reduce pressure in all tyres.",
        "Fit a roof rack.",
        "Avoid carrying unnecessary weight.",
        "Increase road speed."
      ],
      "correct": 3,
      "answerContent": "The more extra weight is in your vehicle, the more fuel you use. Using a roof rack or a roof box increases wind resistance and this also increases fuel consumption ? by as much as 15%. Remove roof racks and roof boxes when not in use."
    },
    {
      "id": 588,
      "content": "Which action is likely to cause an increase in fuel consumption?",
      "labels": [4],
      "options": [
        "Driving at a constant speed.",
        "Turning off air conditioning.",
        "Looking ahead and anticipating traffic flow.",
        "Harsh acceleration."
      ],
      "correct": 4,
      "answerContent": "Harsh acceleration increases fuel consumption. Driving smoothly reduces wear and tear and also improves fuel consumption. Use the highest gear possible without causing the engine to labour."
    },
    {
      "id": 589,
      "content": "What alternatives can drivers take to help protect the environment?",
      "labels": [4],
      "options": [
        "Don't use indicators when turning.",
        "Only use low gears.",
        "Use public transport.",
        "Accelerate and brake harshly while driving."
      ],
      "correct": 3,
      "answerContent": "Using public transport helps to protect the environment. Buses, trams and trains are a more environmentally friendly way to move large numbers of people especially in urban areas. Consider using public transport where possible ? not only is it more environmentally friendly, but it can also be more cost-effective when you take the cost of fuel and parking charges into account."
    },
    {
      "id": 590,
      "content": "How are emergency vehicles identified?",
      "labels": [4],
      "options": [
        "By flashing amber and white lights.",
        "By continuously lit red lights.",
        "By flashing red or blue lights.",
        "By flashing green lights."
      ],
      "correct": 3,
      "answerContent": "If you hear or see an emergency vehicle approaching sounding its siren or flashing lights, be extra careful and give way if it is safe to do so."
    },
    {
      "id": 591,
      "content": "When towing a high and wide-bodied trailer what should a driver do?",
      "labels": [4],
      "options": [
        "Drive with a red flag at the rear left of the trailer.",
        "Make use of extended mirrors to check for following traffic.",
        "Drive with a red flag to the front right-hand side of the trailer.",
        "Drive with hazard warning lights flashing at all times."
      ],
      "correct": 2,
      "answerContent": "When towing a high and wide-bodied trailer, a driver should use extended mirrors on both sides of the towing vehicle. This will allow the driver to better observe the traffic situation behind and to the sides."
    },
    {
      "id": 592,
      "content": "If the vehicle's windows are covered with ice, what should the driver do?",
      "labels": [4],
      "options": [
        "Fully clear ice from all windows.",
        "Use boiling water to clear the ice.",
        "Drive slowly until the heater and demister have cleared the ice.",
        "Clear enough space in the windscreen to be able to see ahead."
      ],
      "correct": 1,
      "answerContent": "Make sure all the windows are completely clear of ice so that the driver can safely observe road and traffic conditions all around. This is especially important when driving in slippery conditions. It is good practice to carry a can of de-icer in the vehicle and if possible to fill the washer reservoir with a de-icing agent."
    },
    {
      "id": 593,
      "content": "What should a driver do if the vehicle's windows and mirrors are covered in ice?",
      "labels": [4],
      "options": [
        "Use boiling water with salt to clear the ice.",
        "Drive at a reduced speed until the heating system has cleared the ice.",
        "Switch on the heating system and use a scraper to clear the ice before driving.",
        "Switch on the windscreen wipers."
      ],
      "correct": 3,
      "answerContent": "Make sure all the windows and mirrors are completely clear of ice so that the driver can safely observe road and traffic conditions all around. This is especially important when driving in slippery conditions. It is good practice to carry a can of de-icer in the vehicle and if possible to fill the washer reservoir with a de-icing agent."
    },
    {
      "id": 594,
      "content": "What specific observations should a driver make before reversing their vehicle?",
      "labels": [4],
      "options": [
        "Look in interior mirror only.",
        "Look over both shoulders and behind.",
        "Look in door mirrors only.",
        "Look over right-hand shoulder."
      ],
      "correct": 2,
      "answerContent": "Before reversing, look over both shoulders and to the rear to check all around that there are no children or other road users around the vehicle and that it is safe to reverse."
    },
    {
      "id": 595,
      "content": "What specific observations should a driver make before reversing a vehicle fitted with an external audible warning device?",
      "labels": [4],
      "options": [
        "Observations should be made to the front, sides and rear of the vehicle, including blind spots.",
        "Observations should be made only in blind spots.",
        "No specific observations needed, as bystanders will be aware of the vehicle.",
        "Observations should be made by opening the driver's door and looking behind."
      ],
      "correct": 1,
      "answerContent": "Drivers should not rely solely on an external audible warning device to warn others that their vehicle is reversing. Before reversing, drivers must make sure it is safe to do so by taking all appropriate observations to the front, sides and rear of the vehicle, including the blind spots. Never assume it is safe to reverse just because the vehicle has an external audible warning device."
    },
    {
      "id": 596,
      "content": "What should a driver do when they intend to reverse into a side road?",
      "labels": [4],
      "options": [
        "Focus totally on the left side door mirror while reversing.",
        "Check carefully all around before and during the reverse.",
        "Open the left side door fully to look behind.",
        "Angle the door mirrors down before reversing."
      ],
      "correct": 2,
      "answerContent": "Before and while reversing into a side road, check all around to make sure it is safe and clear to carry out the manoeuvre, paying particular attention to pedestrians crossing behind the vehicle and any other road users."
    },
    {
      "id": 597,
      "content": "What should a driver do if they intend to reverse their vehicle into an area which they cannot see?",
      "labels": [4],
      "options": [
        "Open driver's door and look behind.",
        "Ask someone to guide you when reversing.",
        "Look in nearside (left) mirror when reversing.",
        "Open driver's window and look behind."
      ],
      "correct": 2,
      "answerContent": "Do not attempt to reverse into an area that you cannot see into properly. You should get assistance from somebody who can guide you safely into the area."
    },
    {
      "id": 598,
      "content": "What should a driver do in order to keep alert during a long journey?",
      "labels": [4],
      "options": [
        "Increase the air circulation and stop if necessary.",
        "Turn up the heater to maintain driver comfort.",
        "Increase speed to shorten the journey.",
        "Keep the radio turned on and windows closed."
      ],
      "correct": 1,
      "answerContent": "While on a long journey, a driver should take regular rest breaks. A short walk and a caffeinated drink (tea or coffee) can help to revive them. The vehicle should be kept cool and well ventilated with a steady flow of fresh air."
    },
    {
      "id": 599,
      "content": "When should rear fog lights be used?",
      "labels": [4],
      "options": [
        "Only in light fog.",
        "In dense fog or falling snow.",
        "Always when driving at night in an unlit area.",
        "When the vehicle behind is too close."
      ],
      "correct": 2,
      "answerContent": "A driver must only use rear fog lights in dense fog or falling snow. Using fog lights in normal road and weather conditions can dazzle or blind following motorists. Also, fog lights may make brake lights harder to see."
    },
    {
      "id": 600,
      "content": "When should rear fog lights be used?",
      "labels": [4],
      "options": [
        "Rear fog lights should be used only at dawn and dusk.",
        "When driving in dense fog or falling snow.",
        "Rear fog lights should always be used.",
        "When both the rear tail lights are broken."
      ],
      "correct": 2,
      "answerContent": "A driver must only use rear fog lights in dense fog or falling snow. Using fog lights in normal road and weather conditions can dazzle or blind following motorists. Also, fog lights may make brake lights harder to see."
    },
    {
      "id": 601,
      "content": "What should a driver do if dazzled by headlights reflecting in the rear-view mirror of their car?",
      "labels": [4],
      "options": [
        "Use the night driving mode on their rear-view mirror.",
        "Turn on the rear fog lights to signal to the following vehicle to turn off their headlights.",
        "Switch the lights off and on to remind the following driver to dip their lights.",
        "Adjust the mirror to reflect the light back towards the following driver."
      ],
      "correct": 1,
      "answerContent": "If a driver is being dazzled by the lights of following traffic, they should adjust their rear-view mirror to the night driving mode. This will allow them to concentrate on the road ahead and not be distracted by lights from following traffic."
    },
    {
      "id": 602,
      "content": "What should a driver do if dazzled by lights at night reflecting in their interior mirror?",
      "labels": [4],
      "options": [
        "Switch on the rear fog lights.",
        "Adjust the mirror to reflect the light back towards the following driver.",
        "Switch on hazard lights.",
        "Temporarily adjust the angle of the mirror."
      ],
      "correct": 4,
      "answerContent": "If the lights of following traffic reflecting in your interior mirror are dazzling you, activate the night driving/anti dazzle mode. If the vehicle is not equipped with this feature drivers should temporarily adjust the angle of the interior mirror to relieve the glare and allow them to drive without distraction."
    },
    {
      "id": 603,
      "content": "At night, what effect could driving with a single headlight have on oncoming drivers?",
      "labels": [4],
      "options": [
        "It could enable them to see the vehicle more clearly.",
        "They could mistake the vehicle for a motorcycle.",
        "It could dazzle them.",
        "It would have no effect on oncoming drivers."
      ],
      "correct": 2,
      "answerContent": "Motor vehicles (except motorcycles) are required by law to have two headlights. A vehicle with only one headlight could be mistaken for a motorcycle and other road users could believe that it is in a different position on the road than it actually is. Vehicle lights should be checked on a regular basis and repair faulty lighting immediately."
    },
    {
      "id": 604,
      "content": "What lights should be shown on a parked car, tractor or works vehicle at night on an unlit public road?",
      "labels": [4],
      "options": [
        "Tail lights only.",
        "At least one side lamp front and rear on the side nearest the kerb.",
        "At least one side lamp front and rear on the side nearest the centre of the road.",
        "Dipped headlights."
      ],
      "correct": 3,
      "answerContent": "When leaving a vehicle on an unlit public road at night this creates a potential danger for other road users. Drivers should therefore leave side/parking lights on, so that the vehicle can be seen by other road users. Drivers should not leave headlights on when parked as this may cause other road users to become disoriented."
    },
    {
      "id": 605,
      "content": "Why is it dangerous to allow children to stand in the space between the front seats of a car?",
      "labels": [4],
      "options": [
        "They could be thrown backward if the brakes are applied suddenly.",
        "They could distract other drivers thus drawing attention away from the road.",
        "They could become ill from the motion of the car.",
        "They could be thrown forward if the brakes are applied suddenly."
      ],
      "correct": 4,
      "answerContent": "When carrying children in a car or goods vehicle, it is the drivers responsibility to make sure that they are suitably restrained."
    },
    {
      "id": 606,
      "content": "When is a tractor most likely to overturn?",
      "labels": [4],
      "options": [
        "When driving on the flat.",
        "When turning sharply.",
        "When driving uphill.",
        "When reversing slowly."
      ],
      "correct": 2,
      "answerContent": "When you are driving a tractor, you should be aware that tractors are less stable than other vehicles and take extra care when manoeuvring."
    },
    {
      "id": 607,
      "content": "What is meant by the term jack-knifing?",
      "labels": [4],
      "options": [
        "When the trailer is travelling faster than the drawing vehicle.",
        "When the trailer is too heavy to be drawn by the tractor.",
        "When the vehicle slides due to ice or water on the road.",
        "When the jack is not strong enough to lift an axle."
      ],
      "correct": 1,
      "answerContent": "Towing a trailer or caravan dramatically reduces the stability of the towing vehicle. If a driver brakes sharply or slows down quickly, the trailer may pivot around the tow hitch coupling, causing both vehicles to go off course, and possibly overturn."
    },
    {
      "id": 608,
      "content": "When should a driver use the vehicle side lights?",
      "labels": [4],
      "options": [
        "When driving in foggy conditions.",
        "When driving in an unlit area at night.",
        "When parking at all times.",
        "When parking on an unlit road."
      ],
      "correct": 4,
      "answerContent": "When leaving a vehicle on an unlit public road at night this creates a potential danger for other road users. Drivers should therefore leave side/parking lights on, so that the vehicle can be seen by other road users. Drivers should not leave headlights on when parked as this may cause other road users to become disoriented."
    },
    {
      "id": 609,
      "content": "What is a possible effect of over-filling the engine with oil?",
      "labels": [4],
      "options": [
        "It could damage the oil pump.",
        "It could reduce the oil pressure.",
        "It could burst the oil filter.",
        "It could damage the catalytic converter."
      ],
      "correct": 4,
      "answerContent": "It is essential that the vehicles engine is not over filled with oil as this can permanently damage the Catalytic converter which is part of most vehicles exhaust systems and removes up to 75% of the carbon monoxide, nitrogen oxide and hydrocarbons from the vehicles exhaust. Damaging this increase exhaust emissions."
    },
    {
      "id": 610,
      "content": "What could a driver do in order to avoid excessive exhaust pollution from their vehicle?",
      "labels": [4],
      "options": [
        "Drive a diesel powered vehicle.",
        "Have the vehicle's air filters changed regularly.",
        "Drive at a higher speed in order to reduce the time spent on the road.",
        "Use a fuel additive to increase the fuel octane rating."
      ],
      "correct": 2,
      "answerContent": "Drivers should have their vehicle serviced regularly in accordance with the manufacturers guidelines. A vehicle with a dirty air filter uses more fuel and creates more exhaust pollution. Air filters should be changed as part of normal servicing. If a vehicle is used in dusty conditions, the air filter may need to be changed more often. More information is available in the vehicle owners handbook."
    },
    {
      "id": 611,
      "content": "In general how regularly should a vehicle be serviced?",
      "labels": [4],
      "options": [
        "As per the manufacturer's recommendation.",
        "Every 30\xA0months.",
        "Once every year.",
        "Every 30,000\xA0kilometres."
      ],
      "correct": 1,
      "answerContent": "Drivers should have their vehicle serviced regularly in accordance with the manufacturers guidelines. This helps the vehicle to perform properly, and as a result saves fuel and reduces emissions. In addition, drivers should also carry out their own daily and weekly checks on fluid levels and tyres."
    },
    {
      "id": 612,
      "content": "What is the purpose of a catalytic converter?",
      "labels": [4],
      "options": [
        "To curb exhaust noise levels only on diesel-powered vehicles.",
        "To reduce harmful exhaust emissions.",
        "To allow the exhaust system to be reconditioned.",
        "To curb exhaust noise levels only on petrol-powered vehicles."
      ],
      "correct": 2,
      "answerContent": "Catalytic converters are part of a vehicles exhaust system. They help to protect the environment by removing up to 75% of the carbon monoxide, nitrogen oxide and hydrocarbons from the vehicles exhaust."
    },
    {
      "id": 613,
      "content": "What should a driver do before getting out of the vehicle?",
      "labels": [4],
      "options": [
        "Check their side mirror and look behind before opening the door.",
        "Open the door part way and then look behind.",
        "Open the door and exit the vehicle without delay.",
        "Check the interior mirror before opening the door."
      ],
      "correct": 1,
      "answerContent": "Before opening any door, check for other road users passing, and in particular look out for pedestrians, cyclists and motorcyclists. Exit the vehicle only when it is safe to do so, and close the door as soon as possible. Where ever possible, passengers should exit on the side nearest the kerb wherever possible."
    },
    {
      "id": 614,
      "content": "What safety precaution should a driver take when getting out of their vehicle?",
      "labels": [4],
      "options": [
        "Check all around for approaching traffic and pedestrians before opening the door.",
        "Ensure the gear lever is in neutral.",
        "Open the door and try to get out as speedily as possible.",
        "Ensure all valuables are secured and out of sight."
      ],
      "correct": 1,
      "answerContent": "Before opening any door, check for other road users passing, and in particular look out for pedestrians, cyclists and motorcyclists. Exit the vehicle only when it is safe to do so, and close the door as soon as possible. Passengers should exit on the side nearest the kerb wherever possible."
    },
    {
      "id": 615,
      "content": "On a busy road, how should a driver allow passengers out of a vehicle?",
      "labels": [4],
      "options": [
        "Stop and allow them to get out on the side nearest the kerb.",
        "Signal to following traffic to overtake before allowing the passengers to get out.",
        "Stop and encourage them to get out as quickly as possible.",
        "Stop and allow them to get out from whichever side of the vehicle they are sitting."
      ],
      "correct": 1,
      "answerContent": "Before allowing any door to be opened, check for other road users passing, and in particular look out for pedestrians, cyclists and motorcyclists. Passengers should exit on the side nearest the kerb, without getting in the way of pedestrians."
    },
    {
      "id": 616,
      "content": "How should a driver apply the brakes in an emergency if the vehicle is fitted with anti-lock brakes (ABS)?",
      "labels": [4],
      "options": [
        "Press the brake pedal only lightly.",
        "Press the brake pedal firmly and hold.",
        "Press and release the brake at slow intervals.",
        "Press and release the brake at rapid intervals."
      ],
      "correct": 2,
      "answerContent": "If your vehicle is fitted with ABS, brake firmly. ABS will not stop the vehicle more quickly, it will only prevent the wheels from locking. This helps you to maintain control of the vehicle."
    },
    {
      "id": 617,
      "content": "What should a driver do if their vehicle gets into a four-wheel sideways skid?",
      "labels": [4],
      "options": [
        "Turn the steering wheel in the opposite direction and apply the handbrake.",
        "Turn the steering wheel in the opposite direction to improve tyre grip.",
        "Turn the steering wheel in the same direction as the skid and ease off the accelerator.",
        "Turn the steering wheel in the same direction as the skid and apply the handbrake."
      ],
      "correct": 3,
      "answerContent": "If your vehicle goes into a four-wheel skid, turn the steering wheel in the same direction as the skid and ease off the accelerator. This should help to bring the wheels back into line and allow you to regain control."
    },
    {
      "id": 618,
      "content": "How should a driver in a vehicle without anti-lock brakes (ABS) deal with a front-wheel straight-line skid?",
      "labels": [4],
      "options": [
        "Press and release the footbrake at rapid intervals.",
        "Turn the steering wheel gently from side to side.",
        "Press in the clutch and release the accelerator.",
        "Pull the handbrake and hold the footbrake down."
      ],
      "correct": 1,
      "answerContent": "If your vehicle does not have ABS and it goes into a straight-line front-wheel skid due to braking, press and release the brake pedal repeatedly and rapidly. This will help to restore tyre grip and enable you to regain control."
    },
    {
      "id": 619,
      "content": "What effect could a front-tyre blow-out have on a vehicle?",
      "labels": [4],
      "options": [
        "The steering wheel will pull to one side.",
        "The wheels will lock up and stop rotating.",
        "Anti-lock brakes will be automatically disengaged.",
        "The steering wheel will stay in the straight on position."
      ],
      "correct": 1,
      "answerContent": "If a front tyre on the vehicle you are driving blows out, you will feel the effect of it through the steering wheel. The wheel will generally pull to the side of the blown-out tyre."
    },
    {
      "id": 620,
      "content": "What effect could a rear-tyre blow-out have on a vehicle?",
      "labels": [4],
      "options": [
        "The steering wheel will pull to the right.",
        "The handbrake will automatically come on.",
        "It could cause the wheels to lock and stop rotating.",
        "It could cause the vehicle to sway from side to side."
      ],
      "correct": 4,
      "answerContent": "If a rear tyre on the vehicle you are driving blows out, the vehicle may sway from side to side, and this will affect its stability. Slow down, pull in where it is safe to do so, and switch on the hazard warning lights. Change the wheel or call for assistance."
    },
    {
      "id": 621,
      "content": "When driving along, a driver feels that the oncoming car may crash into their vehicle. What should they do?",
      "labels": [4],
      "options": [
        "Apply the footbrake gently and bring the vehicle to a halt.",
        "Sound the horn to attract the attention of the other driver and take evasive action.",
        "Apply the handbrake immediately to help bring the vehicle to a halt.",
        "Switch off the engine ignition to help bring the vehicle to a halt."
      ],
      "correct": 2,
      "answerContent": "If there is an oncoming vehicle in your path, take evasive action and sound your horn to alert the other driver. Bring your vehicle to a halt immediately."
    },
    {
      "id": 622,
      "content": "What should a driver do when suddenly confronted by a hazard on the road?",
      "labels": [4],
      "options": [
        "Decelerate and apply the footbrake firmly.",
        "Apply the handbrake and the footbrake together.",
        "Depress clutch and switch off the ignition.",
        "Slowly brake and switch off the ignition."
      ],
      "correct": 1,
      "answerContent": "To stop your vehicle in an emergency, apply the footbrake firmly, and maintain the pressure until the vehicle stops. Depress the clutch pedal just before stopping."
    },
    {
      "id": 623,
      "content": "When driving along and required to stop suddenly, what should a driver do?",
      "labels": [4],
      "options": [
        "Depress the clutch and then apply the handbrake.",
        "Steer sharply to one side and apply the handbrake.",
        "Apply the footbrake firmly.",
        "Apply the handbrake and the footbrake together."
      ],
      "correct": 3,
      "answerContent": "To stop your vehicle in an emergency, apply the footbrake firmly, and maintain the pressure until the vehicle stops. Depress the clutch pedal just before stopping."
    },
    {
      "id": 624,
      "content": "When required to stop in an emergency, what should a driver do?",
      "labels": [4],
      "options": [
        "Apply firm pressure on the footbrake.",
        "Apply both the clutch and handbrake.",
        "Apply gentle pressure to the footbrake.",
        "Press the footbrake and engage a higher gear."
      ],
      "correct": 1,
      "answerContent": "To stop your vehicle in an emergency, apply the footbrake firmly, and maintain the pressure until the vehicle stops. Depress the clutch pedal just before stopping."
    },
    {
      "id": 625,
      "content": "When required to stop in an emergency, what should a driver do?",
      "labels": [4],
      "options": [
        "Apply the footbrake and engage a higher gear.",
        "Switch off the ABS system.",
        "Apply the footbrake firmly.",
        "Depress the clutch pedal and engage a lower gear."
      ],
      "correct": 3,
      "answerContent": "To stop your vehicle in an emergency, apply the footbrake firmly, and maintain the pressure until the vehicle stops. Depress the clutch pedal just before stopping."
    },
    {
      "id": 626,
      "content": "What can a driver do to stay alert on a long journey?",
      "labels": [4],
      "options": [
        "Roll down the window and allow fresh air in.",
        "Turn up the temperature in the vehicle.",
        "Listen attentively to the radio.",
        "Stop, park in a safe place and have a cup of coffee."
      ],
      "correct": 4,
      "answerContent": "If a driver continues to drive fighting sleep it can be the same as being over the drink driving limit. Stopping the vehicle in a safe place, drinking caffeine and taking a nap for 15\xA0minutes will revive the driver allowing them to continue for a short period."
    },
    {
      "id": 627,
      "content": "What effect can wet weather have on the vehicle's exterior mirrors?",
      "labels": [4],
      "options": [
        "It has no effect.",
        "It can short-circuit the electrically heated mirrors.",
        "It can distort the rear vision of the driver.",
        "It can keep them clean."
      ],
      "correct": 3,
      "answerContent": "When driving in the rain, water droplets can adhere to the exterior mirrors and obscure the driver's view to the side and rear of the vehicle. If the vehicle has heated mirrors, turn them on to clear them. Alternatively, stop periodically to clear them manually."
    },
    {
      "id": 628,
      "content": "What should a driver do before starting a journey in adverse weather conditions?",
      "labels": [4],
      "options": [
        "Top up the windscreen washer reservoir with coolant.",
        "Reduce tyre pressures to ensure better grip on the road.",
        "Check the weather forecast for the planned route.",
        "Increase tyre pressure to ensure better grip on the road."
      ],
      "correct": 3,
      "answerContent": "Driving in adverse weather conditions is more dangerous and more tiring. Drivers should check the weather forecast and weather warnings and other sources for information on the expected conditions on the intended route, and allow extra time to complete the journey."
    },
    {
      "id": 629,
      "content": "What should a driver do before starting a journey in bad weather?",
      "labels": [4],
      "options": [
        "Top up the windscreen washer reservoir.",
        "Top up the gearbox with coolant.",
        "Increase tyre pressure to ensure better grip on the road.",
        "Reduce tyre pressure to ensure better grip on the road."
      ],
      "correct": 1,
      "answerContent": "Before starting a long journey in adverse weather the driver should ensure that there is sufficient fluid in the windscreen washer bottle in order to keep the windscreen clear in these conditions."
    },
    {
      "id": 630,
      "content": "When driving on a hill, how should a steep descent be negotiated in snow or frosty weather?",
      "labels": [4],
      "options": [
        "Engage a higher gear than normal in order to avoid wheel-spin.",
        "Keep the clutch depressed and use gentle braking.",
        "Engage a lower gear early and use gentle braking applications to keep the speed down.",
        "Always keep close to the left and use short, sharp brake applications to keep the speed down."
      ],
      "correct": 3,
      "answerContent": "In snow or ice, a vehicle takes longer to stop. Before starting a steep descent in a large vehicle, the driver should reduce speed and select a lower gear, brake gently and only when needed. If the vehicle is fitted with a manually selectable retarder, engage it before starting the descent."
    },
    {
      "id": 631,
      "content": "What should a driver do to secure the vehicle before leaving it?",
      "labels": [4],
      "options": [
        "Leave the engine running with the exhaust brake on.",
        "Apply the parking brake and switch off the engine.",
        "Apply the exhaust brake and switch off the engine.",
        "Leave the engine running with the parking brake on."
      ],
      "correct": 2,
      "answerContent": "Before you leave your vehicle, apply the parking brake and switch off the ignition. Check to make sure that you can open the door safely without endangering others, and alight when it is safe to do so."
    },
    {
      "id": 632,
      "content": "Before driving through a tunnel, what should a driver do?",
      "labels": [4],
      "options": [
        "Check that you have sufficient fuel.",
        "Disengage the global positioning system (GPS).",
        "Turn on side lights only.",
        "Register at the first tunnel station."
      ],
      "correct": 1,
      "answerContent": "If your route takes you through a tunnel, you must ensure that your vehicle has sufficient fuel to safely pass through."
    },
    {
      "id": 633,
      "content": "Before entering a tunnel, what should a driver do in order to improve vision?",
      "labels": [4],
      "options": [
        "Wear sunglasses to prevent glare from the lights.",
        "Pull down the visor to eliminate overhead light glare.",
        "Drive close to the vehicle in front.",
        "Take off sunglasses."
      ],
      "correct": 4,
      "answerContent": "Be aware that there is considerably less light available in a tunnel, even with the tunnel lights on. To improve your vision remove your sunglasses before entering the tunnel."
    },
    {
      "id": 634,
      "content": "When a vehicle is stopped in a tunnel due to congestion what should a driver do?",
      "labels": [4],
      "options": [
        "Switch off the engine and leave the vehicle.",
        "Keep close to the vehicle in front.",
        "Switch on hazard warning lights.",
        "Walk to the nearest emergency exit."
      ],
      "correct": 3,
      "answerContent": "If, when driving a vehicle through a tunnel, you meet traffic congestion, leave a safe distance between you and the vehicle in front and switch on your hazard warning lights when stationary."
    },
    {
      "id": 635,
      "content": "When a vehicle is stopped in a tunnel due to congestion what should a driver do?",
      "labels": [4],
      "options": [
        "Switch off the engine.",
        "Only give hand signals.",
        "Switch on the fog lights.",
        "Keep the engine ticking over in a low gear."
      ],
      "correct": 1,
      "answerContent": "If, when driving a vehicle through a tunnel, you are halted in stationary traffic for any length of time, you should switch off the engine to reduce fumes in the tunnel and conserve fuel."
    },
    {
      "id": 636,
      "content": "What should a driver do if their vehicle is forced to stop in a tunnel due to a breakdown or a crash?",
      "labels": [4],
      "options": [
        "Reverse the vehicle to the exit.",
        "Beckon other traffic to overtake.",
        "Wait in the vehicle for help to arrive.",
        "Call for help from an emergency station."
      ],
      "correct": 4,
      "answerContent": "If there is a breakdown or crash in a tunnel, stop, switch off the engine, switch on the hazard warning lights, check the radio for instructions and use the emergency phone at the emergency station to call for help, check all electronic signs in the tunnel for information."
    },
    {
      "id": 637,
      "content": "What should a driver do if their vehicle breaks down in a tunnel?",
      "labels": [4],
      "options": [
        "Walk to the end of the tunnel to call the Garda\xED.",
        "Hitch a lift to the nearest service area and get help.",
        "Use the emergency telephone to call for help.",
        "Flag down a passing motorist and ask for help."
      ],
      "correct": 3,
      "answerContent": "If a driver's vehicle stops in a tunnel due to a breakdown, switch off the engine, switch on the hazard warning lights, check the radio for instructions and use the emergency phone at the emergency station to call for help, check all electronic signs in the tunnel for information."
    },
    {
      "id": 638,
      "content": "What should a driver do if their vehicle breaks down in a tunnel?",
      "labels": [4],
      "options": [
        "Wait in the vehicle for help to arrive.",
        "Beckon other traffic to overtake.",
        "Reverse the vehicle to the exit.",
        "Switch on the hazard warning lights."
      ],
      "correct": 4,
      "answerContent": "If a driver's vehicle stops in a tunnel due to a breakdown, switch off the engine, switch on the hazard warning lights, check the radio for instructions and use the emergency phone at the emergency station to call for help, check all electronic signs in the tunnel for information."
    },
    {
      "id": 639,
      "content": "If a vehicle being driven through a tunnel goes on fire, what should the driver do?",
      "labels": [4],
      "options": [
        "Stay in the vehicle and phone the emergency station to report the fire.",
        "Leave the vehicle immediately and use the emergency phone at the nearest emergency station.",
        "Wait for the tunnel traffic radio to announce the fire drill.",
        "Drive to the nearest emergency exit as quickly as possible."
      ],
      "correct": 2,
      "answerContent": "If there is smoke or fire in the vehicle, switch off the engine, leave the vehicle immediately, go to the emergency station and use the emergency phone to alert the tunnel operator and leave the tunnel by the nearest available exit."
    },
    {
      "id": 640,
      "content": "When joining a motorway from a slip road, what should a driver do?",
      "labels": [4],
      "options": [
        "Use the size of the vehicle to assert its position on the motorway.",
        "Stop on the slip road until a suitable gap appears in the traffic.",
        "Adjust speed to match that of the motorway traffic, and merge into a suitable gap.",
        "Drive on the hard shoulder for a distance until a suitable gap appears in the traffic."
      ],
      "correct": 3,
      "answerContent": "When joining a motorway from a slip road, drivers should adjust their speed to that of the motorway traffic on the acceleration lane and merge into a suitable gap in Lane 1. Do not force other traffic to swerve or slow down to avoid your vehicle."
    },
    {
      "id": 641,
      "content": "A driver meets a pelican crossing with a flashing amber light showing. There is a pedestrian still on the road. What should the driver do?",
      "labels": [4],
      "options": [
        "Sound the horn as a warning and proceed with care.",
        "Wait and let the pedestrian cross at their own pace.",
        "Beckon the pedestrian to move along as quickly as possible.",
        "Rev the engine to encourage the pedestrian to hurry along."
      ],
      "correct": 2,
      "answerContent": "You must yield to pedestrians at a pelican crossing when the amber light is flashing."
    },
    {
      "id": 642,
      "content": "What would a lightness in the steering MOST likely indicate?",
      "labels": [4],
      "options": [
        "Gravelled surface.",
        "Icy surface.",
        "Smooth surface.",
        "Wet surface."
      ],
      "correct": 2,
      "answerContent": "Lightness in steering indicates a loss of traction. This generally happens when the road surface is icy. Ice provides a harder, smoother surface than rain, or snow so it is difficult to avoid skidding and drivers should allow up to 10 times the normal braking distance in order to stop safely."
    },
    {
      "id": 643,
      "content": "To whom should a driver report aggressive driving?",
      "labels": [4],
      "options": [
        "Transport Infrastructure Ireland",
        "Road Safety Authority.",
        "Health & Safety Authority",
        "Local Garda Station or Traffic Watch."
      ],
      "correct": 4,
      "answerContent": "Report all aggressive driving incidents to Traffic Watch or a Garda station. They are the best people to deal with aggressive driving."
    },
    {
      "id": 644,
      "content": "Which of the following is a possible consequence for a learner driver if they drive after drinking as little as just one unit of alcohol?",
      "labels": [4],
      "options": [
        "A three month disqualification from driving",
        "A one month disqualification from driving",
        "A '60 fine",
        "A '90 fine"
      ],
      "correct": 1,
      "answerContent": "The blood alcohol concentrate limit for novice/learner drivers is much lower than that of a driver who has held their full licence for more than two years (not a novice driver). Therefore as little as one unit of alcohol would result in the driver exceeding the lower limit."
    },
    {
      "id": 645,
      "content": "According to the Pre-Crash Report, in how many fatal collisions was alcohol a contributory factor?",
      "labels": [4],
      "options": [
        "46% and above",
        "Between 31 to 45 %",
        "Between 16 to 30 %",
        "Between 1 to 15 %"
      ],
      "correct": 2,
      "answerContent": "According to the Pre-Crash Report 2008-2012, alcohol was cited as a contributing factor in 38% of the 867 collision on file."
    },
    {
      "id": 646,
      "content": "According to the Pre-Crash Report, how many passengers were killed in a collision where alcohol was a known factor?",
      "labels": [4],
      "options": [
        "More than 91",
        "Between 71-90",
        "Less than 35",
        "Between 36-70"
      ],
      "correct": 2,
      "answerContent": "Alcohol was a contributory factor in fatal collisions. See Report."
    },
    {
      "id": 647,
      "content": "According to the Pre-Crash Report, out of 867 fatal collisions, how many had alcohol as a contributory factor?",
      "labels": [4],
      "options": [
        "201-250",
        "251-350",
        "Less than 100",
        "101-200"
      ],
      "correct": 2,
      "answerContent": "Alcohol was a contributory factor in fatal collisions. See Report."
    },
    {
      "id": 648,
      "content": "During what time periods can a driver be tested for drugs at a road side checkpoint?",
      "labels": [4],
      "options": [
        "Only after an accident.",
        "Only during daylight hours.",
        "Only during night time hours.",
        "Anytime of day or night."
      ],
      "correct": 4,
      "answerContent": "The law allows for a driver to be tested at any time."
    },
    {
      "id": 649,
      "content": "What are the drink driving penalties for a learner driver with a blood alcohol concentrate (BAC) of 20\xA0mg to 80\xA0mg per 100\xA0millilitres of blood?",
      "labels": [4],
      "options": [
        "'200 fine and 3\xA0months driving disqualification.",
        "'200 fine and 6\xA0months driving disqualification.",
        "'200 fine and 3 penalty points.",
        "'200 fine and 5 penalty points."
      ],
      "correct": 1,
      "answerContent": "Alcohol is a major factor in crashes that lead to death and injury. Research proves that even small amounts of alcohol affect your judgement and ability to drive. It is illegal to drive with alcohol levels above the legal limits."
    },
    {
      "id": 650,
      "content": "What are the drink driving penalties for a professional driver holding a full car licence and found to have a blood alcohol concentrate (BAC) of 20\xA0mg to 80\xA0mg per 100\xA0millilitres of blood?",
      "labels": [4],
      "options": [
        "'200 fine and 3\xA0months driving disqualification.",
        "There are no penalties below 50\xA0mg (BAC).",
        "The penalties only apply over 80\xA0mg (BAC).",
        "'100 fine and 6\xA0months driving disqualification."
      ],
      "correct": 1,
      "answerContent": "Alcohol is a major factor in crashes that lead to death and injury. Research proves that even small amounts of alcohol affect your judgement and ability to drive. It is illegal to drive with alcohol levels above the legal limits."
    },
    {
      "id": 651,
      "content": "What are the drink driving penalties for a driver with a blood alcohol concentrate (BAC) of 80\xA0mg to 100\xA0mg per 100\xA0millilitres of blood?",
      "labels": [4],
      "options": [
        "'200 fine and 6\xA0months driving disqualification.",
        "'400 fine and 6\xA0months driving disqualification.",
        "'200 fine and 3\xA0months driving disqualification.",
        "'400 fine and 3\xA0months driving disqualification."
      ],
      "correct": 2,
      "answerContent": "Alcohol is a major factor in crashes that lead to death and injury. Research proves that even small amounts of alcohol affect your judgement and ability to drive. It is illegal to drive with alcohol levels above the legal limits."
    },
    {
      "id": 652,
      "content": "What is the penalty for a driver who refuses to give breath, blood or urine samples as evidence for a second offence to An G\xE1rda S\xEDoch\xE1na?",
      "labels": [4],
      "options": [
        "Automatic disqualification for 12\xA0months.",
        "Automatic disqualification for 3\xA0months.",
        "Automatic disqualification for 4\xA0years.",
        "Automatic disqualification for 6\xA0years."
      ],
      "correct": 4,
      "answerContent": "Alcohol is a major factor in crashes that lead to death and injury. Research proves that even small amounts of alcohol or drugs affect your judgement and ability to drive. It is illegal to drive with alcohol levels above the legal limits, or while under the influence of drugs. It is an offence to refuse to give a breath, blood or urine sample."
    },
    {
      "id": 653,
      "content": "Can An G\xE1rda S\xEDoch\xE1na conduct roadside testing for drugs and alcohol in the mornings?",
      "labels": [4],
      "options": [
        "They can check for alcohol only.",
        "They can check for drugs only.",
        "Yes, they can check at any time.",
        "No, they can't check until after midday."
      ],
      "correct": 3,
      "answerContent": "It is against the law to drive a car, motor bike, truck, bus, pedal bike or an animal-drawn vehicle while 'under the influence of an intoxicant to such an extent as to be incapable of having control of the vehicle?. Intoxicants include alcohol and drugs, whether taken separately or together. The word 'drugs? here includes legal prescribed and over-the-counter (OTC) medicines."
    },
    {
      "id": 654,
      "content": "Along with an impairment test, what may a G\xE1rda request if they suspect a driver of driving under the influence of drugs?",
      "labels": [4],
      "options": [
        "An insurance certificate.",
        "A saliva sample.",
        "A driver's licence.",
        "A breath sample."
      ],
      "correct": 2,
      "answerContent": "If a driver is stopped at a roadside check, they should be aware that, along with the impairment test, Garda\xED can also request a saliva sample if they suspect the driver is driving under the influence of drugs."
    },
    {
      "id": 655,
      "content": "What is the maximum penalty on conviction for drug driving?",
      "labels": [4],
      "options": [
        "'3,000 fine and 12\xA0months in prison.",
        "'3,000 fine and 12\xA0months driving disqualification.",
        "'5,000 fine and 6\xA0months in prison.",
        "'5,000 fine and 6\xA0months driving disqualification."
      ],
      "correct": 3,
      "answerContent": "Drivers should be aware of the severe penalties if they chose to drive having taken drugs and are detected. Drug driving is extremely dangerous due to the effect drugs have on the brain."
    },
    {
      "id": 656,
      "content": "Do the limits for drink and drug driving differ if detected in the morning?",
      "labels": [4],
      "options": [
        "Yes, they are higher in the evening.",
        "Yes, they are lower in the mornings.",
        "No, unless tested after 10.00\xA0am.",
        "No, they are the same at all times."
      ],
      "correct": 4,
      "answerContent": "The limits for drink and drug driving do not change depending on the time of the day drivers are checked. Drink and drugs remain in the body for a period of time. A driver should think carefully before driving a vehicle the morning after taking drink or drugs, and be aware that they could still be well over the limit. (Rewritten)"
    },
    {
      "id": 657,
      "content": "What should a driver do when an emergency service vehicle approaches with flashing blue lights?",
      "labels": [4],
      "options": [
        "Do nothing and ignore the emergency service vehicle.",
        "Brake suddenly to allow the emergency service vehicle to pass.",
        "React quickly, safely and carefully to allow the emergency service vehicle to pass.",
        "Increase speed to prevent obstructing the emergency service vehicle."
      ],
      "correct": 3,
      "answerContent": "A driver needs to know what to do when they see an emergency vehicle. A driver must react quickly, safely and carefully to allow emergency service vehicles to pass. It is important to be alert and attentive at all times."
    },
    {
      "id": 658,
      "content": "What should a driver never do when an emergency service vehicle approaches with flashing blue lights?",
      "labels": [4],
      "options": [
        "Clear the way as soon as possible.",
        "Brake suddenly or block the road.",
        "React quickly, safely and carefully to allow the emergency service vehicle to pass.",
        "Pull over in a place which has enough space for the emergency service vehicle to pass safely."
      ],
      "correct": 2,
      "answerContent": "A driver needs to know what to do when they see an emergency vehicle. A driver must react quickly, safely and carefully to allow emergency service vehicles to pass. It is important to be alert and attentive at all times."
    },
    {
      "id": 659,
      "content": "Can a driver break a red light or break the speed limit to allow an emergency service vehicle to pass?",
      "labels": [4],
      "options": [
        "No, a driver should never break a red light or speed up to allow an emergency service vehicle to pass.",
        "No except where the junction or road is clear, then a driver can break a red light or speed up to allow an emergency service vehicle to pass.",
        "Yes, a driver may legally break a red light to allow an emergency service vehicle to pass.",
        "Yes, a driver may break the speed limit to allow an emergency service vehicle to pass."
      ],
      "correct": 1,
      "answerContent": "A driver needs to know what to do when they see an emergency vehicle. A driver must react quickly, safely and carefully to allow emergency service vehicles to pass. It is important to be alert and attentive at all times."
    },
    {
      "id": 660,
      "content": "If it is safe to overtake a cyclist in speed zones up to 50\xA0km/h, what is the recommended minimum passing distance?",
      "labels": [4],
      "options": [
        "Allow a maximum of 1\xA0metre.",
        "Allow a minimum of 1\xA0metre.",
        "Allow a minimum of 1.75\xA0metres.",
        "Allow a maximum of 1.75\xA0metres."
      ],
      "correct": 2,
      "answerContent": "A driver should drive their vehicle far enough to the left to allow traffic to safely pass or overtake on the right, but not so far to the left that you are driving on a cycle lane or blocking or endangering cyclists or pedestrians. Where a driver wishes to overtake a cyclist and it is safe to do so, they should, if it is possible, give the recommended clearance depending on the speed limit area they are in."
    },
    {
      "id": 661,
      "content": "If it is safe to overtake a cyclist in speed zones over 50\xA0km/h, what is the recommended minimum passing distance?",
      "labels": [4],
      "options": [
        "Allow a maximum of 1.75\xA0metres.",
        "Allow a minimum of 1\xA0metre.",
        "Allow a minimum of 1.5\xA0metres.",
        "Allow a maximum of 1.5\xA0metres."
      ],
      "correct": 3,
      "answerContent": "A driver should drive their vehicle far enough to the left to allow traffic to safely pass or overtake on the right, but not so far to the left that you are driving on a cycle lane or blocking or endangering cyclists or pedestrians. Where a driver wishes to overtake a cyclist and it is safe to do so, they should, if it is possible, give the recommended clearance depending on the speed limit area they are in."
    },
    {
      "id": 662,
      "content": "How can a pedestrian walking along a poorly lit road reduce the risk of an accident occurring?",
      "labels": [4],
      "options": [
        "Wear dark clothing.",
        "Walk as part of a group.",
        "Walk on the left hand side of the road.",
        "Wear high visibility clothing."
      ],
      "correct": 4,
      "answerContent": "Even with the best headlights, drivers can see less at night than during the day. Pedestrians and unlit bicycles are extremely difficult to see in the dark, particularly if they have to deal with the glare of oncoming lights. Pedestrians should always wear bright and hi-viz clothing during the day and reflective clothing at night when walking outside built-up areas."
    },
    {
      "id": 663,
      "content": "What is a courtesy pedestrian crossing?",
      "labels": [4],
      "options": [
        "A pedestrian crossing with 'look right? painted on the roadway.",
        "A pedestrian crossing with flashing amber lights.",
        "An uncontrolled pedestrian crossing place.",
        "A pedestrian crossing on a pedestrian street."
      ],
      "correct": 3,
      "answerContent": "Pedestrians should only enter uncontrolled crossing places (courtesy crossing) ensuring that all traffic is aware of their presence if crossing the road. Motorists entering uncontrolled crossing places (courtesy crossing) should react by driving very slowly, and be aware of the potential dangers of pedestrians using the area."
    },
    {
      "id": 664,
      "content": "What is the likely effect of motorists 'rubbernecking? at the scene of a traffic incident?",
      "labels": [4],
      "options": [
        "It can cause additional incidents as drivers become distracted.",
        "It allows traffic to change course without attention.",
        "It allows traffic to change speed without attention.",
        "It can increase traffic flow near an incident."
      ],
      "correct": 1,
      "answerContent": "When approaching or being near to the scene of an incident, motorists are often seen 'rubbernecking?. This means turning your head and stretching your neck to get a better view of what's happening. It can be the cause of traffic jams as drivers slow down to 'rubberneck?. It can also cause road incidents as drivers become distracted and change their speed and/or direction while other drivers are also distracted."
    },
    {
      "id": 665,
      "content": "How should a driver react to emergency services vehicles with flashing blue lights and/or sirens on?",
      "labels": [4],
      "options": [
        "Mount kerb on offside of the road to make room.",
        "Check their mirrors before looking for space to move aside.",
        "Only move aside if it is an ambulance.",
        "Brake suddenly and stop to avoid causing obstruction."
      ],
      "correct": 2,
      "answerContent": "If you see any emergency vehicle approaching with lights and/or sirens activated, check your rear view mirrors to gauge the speed of the emergency vehicle/s and also look out for pedestrians, cyclists, motorcyclists and other road users. Indicate your intention to pull over. Pull over only in a space that has enough space for the emergency vehicle/s to pass safely. Move off safely with appropriate observations and signals after the emergency vehicle has passed."
    },
    {
      "id": 666,
      "content": "What is the penalty for a vehicle owner who allows a learner driver to drive their vehicle unaccompanied?",
      "labels": [4],
      "options": [
        "They will lose their driving licence.",
        "They will be fined '2,000.",
        "They will incur 2 penalty points on their licence.",
        "Their vehicle will be seized."
      ],
      "correct": 4,
      "answerContent": "A learner driver needs to be aware that driving unaccompanied in a vehicle, even where the owner has given their consent to drive, may result in the vehicle being seized."
    },
    {
      "id": 667,
      "content": "A learner permit driver who receives 7 penalty points in a 36\xA0month period (three years) will be banned from driving for how many months?",
      "labels": [4],
      "options": [
        "3\xA0months.",
        "9\xA0months.",
        "6\xA0months.",
        "12\xA0months."
      ],
      "correct": 3,
      "answerContent": "A learner driver needs to be aware that there is a lower penalty point threshold for learner or novice drivers"
    },
    {
      "id": 668,
      "content": "How many penalty points will an unaccompanied learner driver receive on conviction?",
      "labels": [4],
      "options": [
        "2 penalty points.",
        "3 penalty points.",
        "4 penalty points.",
        "5 penalty points."
      ],
      "correct": 3,
      "answerContent": "A learner driver needs to be aware that driving unaccompanied increases the penalty points to 4 on conviction."
    },
    {
      "id": 669,
      "content": "What is the fine for a learner driver for driving a vehicle unaccompanied?",
      "labels": [4],
      "options": [
        "'120",
        "'140",
        "'80",
        "'100"
      ],
      "correct": 1,
      "answerContent": "A learner driver needs to be aware that driving unaccompanied increases the fine to '120 on conviction."
    },
    {
      "id": 670,
      "content": "A learner driver who has been stopped by a Garda for driving unaccompanied faces a minimum fine of how much?",
      "labels": [4],
      "options": [
        "'120",
        "'80",
        "'100",
        "'140"
      ],
      "correct": 2,
      "answerContent": "A learner driver needs to be aware that, if they are stopped by a Garda for driving unaccompanied, it will lead to a financial penalty."
    },
    {
      "id": 671,
      "content": "If the owner of a vehicle allows a learner driver to drive their vehicle, what is the maximum fine the owner could face?",
      "labels": [4],
      "options": [
        "'1,000",
        "'2,000",
        "'1,500",
        "'500"
      ],
      "correct": 1,
      "answerContent": "A learner driver needs to be aware that driving unaccompanied in a vehicle which they do not own could see the owner facing a fine of up to '1,000 and having the vehicle seized."
    },
    {
      "id": 672,
      "content": "Is a learner driver permitted to drive unaccompanied if they have the consent of the vehicle owner?",
      "labels": [4],
      "options": [
        "Yes, provided the vehicle owner has given their consent.",
        "Yes, provided the vehicle owner has open drive insurance.",
        "Yes, provided the owner is a family member and has given their consent.",
        "No, a learner driver is not permitted to drive unaccompanied even with the owner's consent."
      ],
      "correct": 4,
      "answerContent": "A learner driver needs to be aware that, even with the consent of the owner of the vehicle, they are not permitted to drive unaccompanied."
    },
    {
      "id": 673,
      "content": "For how long is a learner driver's accompanying driver required to have held their full licence in Category B?",
      "labels": [4],
      "options": [
        "6\xA0months.",
        "3\xA0years.",
        "1\xA0year.",
        "2\xA0years."
      ],
      "correct": 4,
      "answerContent": "A learner driver needs to be aware that not just anyone can be an accompanying driver. An accompanying driver has to have held a full licence for at least 2\xA0years and have built up good driving experience."
    },
    {
      "id": 674,
      "content": "What are the fixed charge amount and penalties incurred for a learner driver who drives unaccompanied?",
      "labels": [4],
      "options": [
        "'80 fine and 3 penalty points.",
        "'100 fine and 2 penalty points.",
        "'80 fine and 2 penalty points.",
        "'60 fine and 5 penalty points."
      ],
      "correct": 3,
      "answerContent": "A learner driver needs to know that there are penalties for driving unaccompanied."
    },
    {
      "id": 675,
      "content": "A learner driver detected of driving unaccompanied faces a minimum of how many penalty points?",
      "labels": [4],
      "options": [
        "3 penalty points.",
        "2 penalty points.",
        "4 penalty points.",
        "5 penalty points."
      ],
      "correct": 2,
      "answerContent": "A learner driver needs to be aware that driving unaccompanied will result in a penalty point offence."
    },
    {
      "id": 676,
      "content": "When a learner driver has passed their driving test, are they permitted to drive unaccompanied as the holder of a Certificate of Competency?",
      "labels": [4],
      "options": [
        "Yes, a learner driver is permitted to drive unaccompanied on a Certificate of Competency once they have 'N? plates displayed.",
        "No, a learner driver is not permitted to drive unaccompanied on a Certificate of Competency unless they continue to display 'L? plates.",
        "Yes, a learner driver is permitted to drive unaccompanied on a Certificate of Competency once they have notified their insurance company.",
        "No, a learner driver is not permitted to drive unaccompanied until they have been issued with a full driving licence in that category."
      ],
      "correct": 4,
      "answerContent": "A learner driver who successfully passes their driving test needs to be aware that the rules that apply to learner permit holders still apply to them until they are in possession of a full driving licence in that category. A Certificate of Competency is not a full licence."
    },
    {
      "id": 677,
      "content": "Can a learner driver drive unaccompanied if they are on their third or subsequent learner permit?",
      "labels": [4],
      "options": [
        "No, unless they display 'L? plates on the front and rear of the vehicle.",
        "Yes, provided they display 'N? plates on the front and rear of the vehicle.",
        "No, they cannot drive unaccompanied on any learner permit.",
        "Yes, but not on motorways."
      ],
      "correct": 3,
      "answerContent": "A learner driver needs to be aware that they are not permitted under any circumstance to drive unaccompanied regardless of the amount of learner permits held."
    },
    {
      "id": 678,
      "content": "Can a person who has passed their car driving test within the last two years act as an accompanying driver?",
      "labels": [4],
      "options": [
        "Yes, as long as they have their full licence with them.",
        "Yes, as long as they have completed their Essential Driver Training (EDT).",
        "No, unless they are a qualified approved driving instructor (ADI).",
        "No, they must hold the full driving licence for a minimum of 2\xA0years."
      ],
      "correct": 4,
      "answerContent": "To be an accompanying driver for a learner driver, you must have a full driving licence for at least 2\xA0years."
    },
    {
      "id": 679,
      "content": "Are there any occasions when a learner driver can drive unaccompanied?",
      "labels": [4],
      "options": [
        "Yes, when meeting an approved driving instructor (ADI).",
        "Yes, after completing a driving test.",
        "No, learner drivers must be accompanied at all times by a qualified driver.",
        "Yes, when driving to the test centre before the driving test."
      ],
      "correct": 3,
      "answerContent": "Learner drivers must be aware that they must be accompanied by a qualified driver at all times."
    },
    {
      "id": 680,
      "content": "What should a driver do in the event of a breakdown or incident in a tunnel?",
      "labels": [4],
      "options": [
        "Beckon other traffic to overtake.",
        "Signal the vehicle behind to stop and ask the driver to summon help at the other end of the tunnel.",
        "Reverse the vehicle if necessary to make room for overtaking traffic.",
        "Switch off the engine and switch on the hazard lights."
      ],
      "correct": 4,
      "answerContent": "If your vehicle breaks down or is involved in a collision in a tunnel, switch on your hazard warning lights, switch off your engine, go to an emergency station and use the emergency phone to alert the tunnel operator."
    },
    {
      "id": 681,
      "content": "Is a driver allowed to sound the horn while driving in a built-up area at night?",
      "labels": [4],
      "options": [
        "Yes, but between 11:30\xA0pm and 7:00\xA0am the horn may be sounded only in an emergency.",
        "No, use of the horn is not permitted in a built-up area between 11:30\xA0pm and 7:00\xA0am.",
        "Yes, but only for momentary use.",
        "Yes, but only between 11:30\xA0pm and 7:00\xA0am."
      ],
      "correct": 1,
      "answerContent": "Drivers are not allowed to use the horn in a built-up area between 11:30\xA0pm and 7:00\xA0am unless there is a traffic emergency. Only use a horn to warn other road users of danger or if needed to make them aware of your vehicles presence for safety reasons. Using the horn does not give drivers an automatic right of way. Never use the horn to provoke a reaction from or to rebuke another motorist."
    },
    {
      "id": 682,
      "content": "What is the minimum penalty point offence for a learner driver not displaying 'L? Plates both on the front and rear of the vehicle?",
      "labels": [4],
      "options": [
        "1 penalty point.",
        "3 penalty points.",
        "4 penalty points.",
        "2 penalty points."
      ],
      "correct": 4,
      "answerContent": "A learner driver needs to be aware of the legal requirements to display 'L? plates front and rear and the implications of not doing so."
    },
    {
      "id": 683,
      "content": "At traffic lights, a driver should take particular care for which road users coming up on the left?",
      "labels": [4],
      "options": [
        "Vans.",
        "Motorcyclists.",
        "Cars.",
        "Tractors."
      ],
      "correct": 2,
      "answerContent": "Before moving off at traffic lights the driver should be aware of traffic, particularly cyclists and motorcyclists, coming up on the left, especially where there is an advanced stop line for cyclists ahead of that which applies to other road users."
    },
    {
      "id": 684,
      "content": "When a driver intends to make a left-hand turn at a junction where there are pedestrians and cyclists present, what should a driver do?",
      "labels": [4],
      "options": [
        "Check the right-hand mirror, make the turn and then signal.",
        "Signal left, watch the right-hand mirror and make the turn.",
        "Check your mirrors and watch for cyclists or pedestrians on the left.",
        "Sound the horn while proceeding to warn the other road users of the intention to turn."
      ],
      "correct": 3,
      "answerContent": "The vehicle does not have a greater right-of-way than any other road user. As a driver you should pay particular attention to vulnerable road users such as pedestrians, cyclists and motorcyclists and be aware that they are entitled to use the road in safety."
    },
    {
      "id": 685,
      "content": "Which of the following road users are most vulnerable in slow-moving city traffic?",
      "labels": [4],
      "options": [
        "Vans.",
        "Motorcyclists.",
        "Cars.",
        "Taxis."
      ],
      "correct": 2,
      "answerContent": "In slow-moving city traffic, you should be aware of and check your blind spots before any manoeuvre. Motorcyclists can easily become hidden in a blind spot, and in slow-moving traffic, they might be moving faster than you are."
    },
    {
      "id": 686,
      "content": "Which of the following road users are most vulnerable in slow-moving city traffic?",
      "labels": [4],
      "options": [
        "Cars.",
        "Pedestrians.",
        "Taxis.",
        "Vans."
      ],
      "correct": 2,
      "answerContent": "In slow-moving city traffic, you should be aware of and check your blind spots before any manoeuvre. Pedestrians can easily become hidden in a blind spot, and in slow-moving traffic, they might be moving faster than you are."
    },
    {
      "id": 687,
      "content": "What should a driver do when driving at night on an unlit road?",
      "labels": [4],
      "options": [
        "Drive close to the left and switch on front fog lights.",
        "Drive at least 30\xA0km/h below the posted speed limit.",
        "Watch out for unlit cyclists.",
        "Keep well out from the left-hand side of the road."
      ],
      "correct": 3,
      "answerContent": "While driving at night and even with the best headlights, it can be very difficult to see all the hazards that you might come across ? for example, stray animals or livestock on the road. At night you should drive at a speed that will enable you to stop safely within the distance you can see to be clear ahead."
    },
    {
      "id": 688,
      "content": "What can be achieved by the driving style known as 'Eco-Driving??",
      "labels": [4],
      "options": [
        "Increased journey times.",
        "Increased emissions.",
        "Reduced journey times.",
        "Improved road safety."
      ],
      "correct": 4,
      "answerContent": "The advantages of eco-driving include improved road safety, improved fuel consumption and reduced emissions. The eco-conscious driver becomes a more efficient driver because they learn to read the road further ahead and display better anticipation skills. This reduces the need for harsh acceleration and braking which results in a more economical style of driving and a smoother drive."
    },
    {
      "id": 689,
      "content": "What can be achieved by the driving style known as 'Eco-Driving??",
      "labels": [4],
      "options": [
        "Increased emissions.",
        "Increased fuel consumption.",
        "Increased journey times.",
        "Increased fuel efficiency."
      ],
      "correct": 4,
      "answerContent": "One of the many advantages of an eco-driving style, includes; increased fuel efficiency, reduced emissions and improved driver safety. The eco-conscious driver becomes a more efficient driver because they learn to read the road further ahead and display better anticipation skills. This reduces the need for harsh acceleration and braking which results in a more economical style of driving and a smoother journey."
    },
    {
      "id": 690,
      "content": "Which action contributes to Eco-Driving?",
      "labels": [4],
      "options": [
        "Maintaining a steady speed.",
        "Driving with the windows open.",
        "Braking harshly.",
        "Driving in a low gear at high speed."
      ],
      "correct": 1,
      "answerContent": "One of the many advantages of maintaining a steady speed includes: increased fuel efficiency, reduced emissions and improved driver safety. The eco-conscious driver becomes a more efficient driver because they learn to read the road further ahead and display better anticipation skills. This reduces the need for harsh acceleration and braking which results in a more economical style of driving and a smoother journey."
    },
    {
      "id": 691,
      "content": "Which action contributes to Eco-Driving?",
      "labels": [4],
      "options": [
        "Looking ahead and anticipating.",
        "Reducing tyre pressure.",
        "Braking harshly.",
        "Driving in a low gear at high speed."
      ],
      "correct": 1,
      "answerContent": "One of the many advantages of an eco-driving style, includes; increased fuel efficiency, reduced emissions and improved driver safety. The eco-conscious driver becomes a more efficient driver because they learn to read the road further ahead and display better anticipation skills. This reduces the need for harsh acceleration and braking which results in a more economical style of driving and a smoother journey."
    },
    {
      "id": 692,
      "content": "When a driver intends to make a left-hand turn on a busy city street junction and there are pedestrians and cyclists around, what should the driver do?",
      "labels": [4],
      "options": [
        "Stay close to the left to prevent cyclists or pedestrians coming up on your left side.",
        "Watch for cyclists or pedestrians who may try to cross the road in front of the vehicle.",
        "Signal left, watch the right-hand mirror and make the turn when it is clear.",
        "Keep to the right to make room for cyclists to pass."
      ],
      "correct": 2,
      "answerContent": "When making a left-hand turn on a busy city street, drivers should pay particular attention to vulnerable road users such as pedestrians, cyclists and motorcyclists who may appear unexpectedly and may not be aware of the vehicle's intention."
    },
    {
      "id": 693,
      "content": "What should a driver do when they want to use a mobile phone?",
      "labels": [4],
      "options": [
        "Reduce speed, show caution, and be alert for other road users.",
        "Pull in and stop in a safe place.",
        "Keep the conversation short.",
        "Allow a wider gap to open up with the vehicle in front and continue at normal speed."
      ],
      "correct": 2,
      "answerContent": "It is illegal to use or handle a mobile phone while driving. Driving requires all of your attention, all of the time, so you should never use or handle a mobile phone while driving. If you want to use a mobile phone, the only safe thing to do is to find a safe place to stop."
    },
    {
      "id": 694,
      "content": "Before exiting the vehicle on a busy road, what should the driver ensure?",
      "labels": [4],
      "options": [
        "That the passengers open their door first.",
        "Before opening the door the driver should check it is safe to do so.",
        "That the gear lever is in neutral.",
        "That the wheels are positioned straight ahead."
      ],
      "correct": 2,
      "answerContent": "When exiting from a parked vehicle on a busy road, the driver should check it is safe to do so before opening the door, as there could be cyclists or other traffic passing closely by."
    },
    {
      "id": 695,
      "content": "As the driver of the car, which conduct is correct?",
      "labels": [4],
      "options": [
        "A driver may proceed with caution.",
        "Slow down and beckon the motorcyclist to cross the road.",
        "A driver must give way to traffic on the left.",
        "A driver must drive on the right-hand side to allow clearance to the motorcyclist."
      ],
      "correct": 1,
      "answerContent": "You may proceed, but you should be aware of the presence of the motorcyclist. You should always be prepared to react to a change in the traffic situation ? for example, the motorcyclist might not have seen your vehicle.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_5Iezf.png",
      "img_name": "card 695.png"
    },
    {
      "id": 696,
      "content": "When approaching the pedestrian crossing, what should the driver do in this situation?",
      "labels": [4],
      "options": [
        "Maintain speed, because the pedestrians have not stepped on to the crossing.",
        "Continue to drive on fast because the pedestrians have to wait.",
        "Slow down in good time and be prepared to stop.",
        "Sound the horn to draw attention to your vehicle and continue to drive at the same speed."
      ],
      "correct": 3,
      "answerContent": "When there are pedestrians at or near a zebra crossing, you should slow down on approach and be prepared to stop to allow the pedestrians to cross safely.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_sE5Ez.png",
      "img_name": "card 696.png"
    },
    {
      "id": 697,
      "content": "What should the driver do in this situation?",
      "labels": [4],
      "options": [
        "As the driver is entering the roundabout they have right of way.",
        "The driver may proceed onto the roundabout in front of the yellow car.",
        "The driver must wait for the yellow car to stop.",
        "The driver must yield to the yellow car on the roundabout."
      ],
      "correct": 4,
      "answerContent": "When you reach the roundabout, you must give way to traffic approaching from the right ? unless signs, road markings or traffic lights tell you otherwise.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_1oKgq.png",
      "img_name": "card 697.png"
    },
    {
      "id": 698,
      "content": "What should the car driver do in this situation?",
      "labels": [4],
      "options": [
        "The car driver must allow the motorcycle to proceed.",
        "The car driver is not allowed to turn right.",
        "The car driver may proceed first.",
        "The car driver must allow the bus to proceed."
      ],
      "correct": 1,
      "answerContent": "When you are turning right from a major road to a minor road, you must yield to oncoming traffic. You should proceed only when it is safe to do so.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_Bj9tb.png",
      "img_name": "card 698.png"
    },
    {
      "id": 699,
      "content": "What should the driver do in this situation?",
      "labels": [4],
      "options": [
        "The driver must allow the red car to proceed.",
        "The driver must allow the blue car to proceed.",
        "The driver may turn in front of the other two cars.",
        "The driver must stop and allow all other traffic to proceed."
      ],
      "correct": 3,
      "answerContent": "When you are turning right from a major road to a minor road, you must yield to oncoming traffic and only proceed when it is safe to do so. However, the drivers on the minor roads must give way to the traffic on the major road.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_gYSEY.png",
      "img_name": "card 699.png"
    },
    {
      "id": 700,
      "content": "What should a driver be alert to in this area?",
      "labels": [4],
      "options": [
        "There may be refuse bins between the parked vehicles.",
        "Pedestrians may be hitch-hiking.",
        "Pedestrians may cross between parked cars.",
        "Parked vehicles may have trailers attached."
      ],
      "correct": 3,
      "answerContent": "When driving in a built-up area, you should drive with caution and be prepared to react to pedestrians crossing from between parked vehicles.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_9flx6.png",
      "img_name": "card 700.png"
    },
    {
      "id": 701,
      "content": "What should the driver do if there are children playing at the edge of the roadway?",
      "labels": [4],
      "options": [
        "Reduce speed, drive cautiously and remain ready to brake.",
        "Accelerate and move to the right-hand side of the road to avoid the children.",
        "Give a warning signal and drive past at the same speed.",
        "Maintain the same speed because the children can see an oncoming vehicle quite clearly at this point."
      ],
      "correct": 1,
      "answerContent": "Because it is difficult to predict children's behaviour, you should always be prepared to react to a change in the traffic situation and be prepared to stop.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_Wf1Hy.png",
      "img_name": "card 701.png"
    },
    {
      "id": 702,
      "content": "What should the driver do in this situation?",
      "labels": [4],
      "options": [
        "The driver must allow the red car to proceed.",
        "The driver may proceed first.",
        "The driver is not allowed to turn right.",
        "The driver must allow the blue truck to proceed."
      ],
      "correct": 4,
      "answerContent": "When you are turning right from a major road to a minor road, you must yield to oncoming traffic and proceed only when it is safe to do so. You should also be aware that there might be emerging from the minor road.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_eSwTt.png",
      "img_name": "card 702.png"
    },
    {
      "id": 703,
      "content": "What should a driver be conscious of in this situation?",
      "labels": [4],
      "options": [
        "The bus driver will always signal before moving off.",
        "Traffic emerging from the street on the left.",
        "People crossing the street at the rear of the bus.",
        "The bus may start to reverse."
      ],
      "correct": 3,
      "answerContent": "You should always read the road ahead and be prepared to react to the changing traffic situation. In particular, you should be aware that pedestrians might emerge at the rear of the bus. In this situation you should also look out for pedestrians making their way towards the waiting Bus",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_6dcE8.png",
      "img_name": "card 703.png"
    },
    {
      "id": 704,
      "content": "The silver car is overtaking the parked red car, what should the driver do in this situation?",
      "labels": [4],
      "options": [
        "The driver should drive on if he does not hit the ball.",
        "The driver should drive on at the same speed.",
        "The driver should move closer to the red car.",
        "Reduce speed considerably and be ready to stop."
      ],
      "correct": 4,
      "answerContent": "You should read the road and be extra careful while driving through an area where children might be playing. When a ball bounces out on the road you should expect that a child might follow to retrieve the ball.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_MtrDX.png",
      "img_name": "card 704.png"
    },
    {
      "id": 705,
      "content": "The driver is following these two vehicles and wishes to overtake - what must the driver consider before overtaking here?",
      "labels": [4],
      "options": [
        "The driver of the silver car may decide to turn right.",
        "The driver should overtake both vehicles together.",
        "The driver's field of view is not good enough to allow safe overtaking.",
        "The roadway markings forbid overtaking here."
      ],
      "correct": 3,
      "answerContent": "You should always make sure that the road ahead is clear so that there is enough distance to allow you to overtake and get back to the correct side of the road without forcing any other road user to alter speed or course. In this case, the brow of the hill is too close to allow a driver to overtake safely.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_qhkpA.png",
      "img_name": "card 705.png"
    },
    {
      "id": 706,
      "content": "What should a driver be aware of when approaching a vehicle which is attempting to park?",
      "labels": [4],
      "options": [
        "That the vehicle being parked may move out without warning.",
        "The driver may have to stop and assist the driver parking the vehicle.",
        "That there may be a driveway at the point where the vehicle is parking.",
        "The vehicle may be parking at an area designated for loading."
      ],
      "correct": 1,
      "answerContent": "When you approach a vehicle that is being parked on the roadway, you should be aware that its driver will probably be concentrating on parking the vehicle and may not be aware of moving out into the road to correct its position.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_MBz2z.png",
      "img_name": "card 706.png"
    },
    {
      "id": 707,
      "content": "What should the driver of the silver car do before turning left?",
      "labels": [4],
      "options": [
        "Overtake the cyclist on the left and complete the turn.",
        "Increase speed to be able to complete the left turn before the cyclist.",
        "Allow the cyclist heading straight on to pass.",
        "Sound the horn to alert the cyclist to the car's presence."
      ],
      "correct": 3,
      "answerContent": "Do not overtake a cyclist as you approach a junction at which you are turning left. The cyclist might be continuing ahead. Cyclists are vulnerable road users and may be unstable in slow-moving traffic and at junctions. Give them more room.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_GvLDK.png",
      "img_name": "card 707.png"
    },
    {
      "id": 708,
      "content": "What should the driver do?",
      "labels": [4],
      "options": [
        "The driver should allow the oncoming cyclist to turn first.",
        "The driver should allow the yellow car to proceed.",
        "The driver must stop and yield to all traffic.",
        "The driver may turn left first."
      ],
      "correct": 2,
      "answerContent": "At a cross junction of equal importance the traffic approaching from the right has priority. It is important to understand that the right of way is not an absolute right. You must proceed with caution while showing regard for other road users.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_II6eN.png",
      "img_name": "card 708.png"
    },
    {
      "id": 709,
      "content": "A driver wants to pull out of a driveway and turn right onto the road. At the same time a cyclist is approaching from the right and a pedestrian wants to cross. Who must wait?",
      "labels": [4],
      "options": [
        "The pedestrian and the cyclist must wait.",
        "The driver must wait.",
        "The cyclist must wait.",
        "The pedestrian must wait."
      ],
      "correct": 2,
      "answerContent": "By law you must give way to other road users, including pedestrians and cyclists, when you are entering or leaving a driveway.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_tZq7f.png",
      "img_name": "card 709.png"
    },
    {
      "id": 710,
      "content": "What action should the driver take?",
      "labels": [4],
      "options": [
        "Proceed in front of the bus.",
        "Signal the bus to proceed.",
        "Proceed in front of the cyclist.",
        "Stop at the Stop line."
      ],
      "correct": 4,
      "answerContent": "By law you must stop at a Stop line (or at a Stop sign if there is no Stop line), and wait for other traffic to clear before proceeding.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_98JFT.png",
      "img_name": "card 710.png"
    },
    {
      "id": 711,
      "content": "What should a driver do when travelling behind this vehicle?",
      "labels": [4],
      "options": [
        "Overtake the vehicle in front.",
        "Pass the vehicle slowly by mounting the kerb on the left.",
        "Drive as close as possible to the vehicle.",
        "Reduce speed and prepare to stop if necessary."
      ],
      "correct": 4,
      "answerContent": "You should always read the road ahead and be prepared to react to the changing traffic situation as you approach junctions.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_xQAkY.png",
      "img_name": "card 711.png"
    },
    {
      "id": 712,
      "content": "How should a driver overtake the cyclist in this situation?",
      "labels": [4],
      "options": [
        "Overtake the cyclist, but without crossing any of the lines.",
        "By straddling both lines and keeping close to the cyclist.",
        "By sounding the horn to warn the cyclist they intend to pass.",
        "By crossing the broken white line."
      ],
      "correct": 4,
      "answerContent": "Where there are two lines in the centre of the road, you must obey the one closest to you. So, if the closest line is a broken white line, by law you may overtake, so long as it is safe to do so.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_W4Fvi.png",
      "img_name": "card 712.png"
    },
    {
      "id": 713,
      "content": "The driver intends to turn left at this junction - what should the driver do?",
      "labels": [4],
      "options": [
        "Turn left in front of the cyclist.",
        "Allow the van and cyclist to proceed.",
        "Yield right of way to the van.",
        "Allow the cyclist to continue before turning left."
      ],
      "correct": 4,
      "answerContent": "Do not overtake a cyclist as you approach a junction at which you are turning left. The cyclist might be continuing ahead. Cyclists are vulnerable road users and may be unstable in slow-moving traffic and at junctions. Give them more room.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_PoMFr.png",
      "img_name": "card 713.png"
    },
    {
      "id": 714,
      "content": "Why might it be dangerous to drive on a poorly-lit street?",
      "labels": [4],
      "options": [
        "Drivers can only see the traffic coming against them.",
        "It may be difficult to make out poorly lit vehicles in the dark areas.",
        "Drivers can only see the traffic in front of them.",
        "Traffic lights will not be working."
      ],
      "correct": 2,
      "answerContent": "When you are driving along a poorly-lit street, you should take extra care and be prepared to react to hazards such as unlit parked vehicles.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_5nUU5.png",
      "img_name": "card 714.png"
    },
    {
      "id": 715,
      "content": "The driver intends to turn right at this junction - what should the driver do?",
      "labels": [4],
      "options": [
        "Proceed in front of the motorcycle and the bus.",
        "Stop in front of the motorcycle.",
        "Stop in front of the bus.",
        "Stop at the line."
      ],
      "correct": 4,
      "answerContent": "You must stop at the line where a junction is controlled by a Stop sign and Stop line. Do not proceed until it is safe to do so.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_4E7eI.png",
      "img_name": "card 715.png"
    },
    {
      "id": 716,
      "content": "What danger should a driver allow for over the brow of this hill?",
      "labels": [4],
      "options": [
        "There may be a bus stop ahead.",
        "Traffic calming measures may apply.",
        "There may be no road markings ahead.",
        "There may be a slow moving vehicle in your lane."
      ],
      "correct": 4,
      "answerContent": "On the approach to the brow of a hill you should be extra careful and be prepared to react to a change in the traffic situation.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_psbYX.png",
      "img_name": "card 716.png"
    },
    {
      "id": 717,
      "content": "What danger should a driver allow for over the brow of this hill?",
      "labels": [4],
      "options": [
        "Safety cameras may be in operation.",
        "A vehicle may be broken down.",
        "There may be a pelican crossing ahead.",
        "A high-sided vehicle may be approaching."
      ],
      "correct": 2,
      "answerContent": "On the approach to the brow of a hill you should be extra careful and be prepared to react to a change in the traffic situation.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_YTCIZ.png",
      "img_name": "card 717.png"
    },
    {
      "id": 718,
      "content": "What danger should a driver allow for over the brow of this hill?",
      "labels": [4],
      "options": [
        "There may be oncoming pedestrians.",
        "Traffic calming measures may apply.",
        "A high-sided vehicle may be approaching.",
        "There may be no road markings."
      ],
      "correct": 1,
      "answerContent": "On the approach to the brow of a hill you should be extra careful and be prepared to react to a change in the traffic situation.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_ARYip.png",
      "img_name": "card 718.png"
    },
    {
      "id": 719,
      "content": "What danger should a driver allow for over the brow of this hill?",
      "labels": [4],
      "options": [
        "There may be livestock on the road.",
        "There may be a bus stop ahead.",
        "Safety cameras may be in operation.",
        "There may be no road markings."
      ],
      "correct": 1,
      "answerContent": "On approach to the brow of a hill you should be extra careful and be prepared to react to a change in the traffic situation.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_RRdGd.png",
      "img_name": "card 719.png"
    },
    {
      "id": 720,
      "content": "What danger should a driver allow for over the brow of this hill?",
      "labels": [4],
      "options": [
        "There may be hedge-cutting taking place.",
        "There may be a pelican crossing ahead.",
        "Traffic calming measures may apply.",
        "A high-sided vehicle may be approaching."
      ],
      "correct": 1,
      "answerContent": "On the approach to the brow of a hill you should be extra careful and be prepared to react to a change in the traffic situation.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_V3Etx.png",
      "img_name": "card 720.png"
    },
    {
      "id": 721,
      "content": "What should a driver be aware of in this situation?",
      "labels": [4],
      "options": [
        "The bus may be parked at a terminus.",
        "Only buses may use this road.",
        "There may be a car hidden from view in front of the bus.",
        "The bus may be towing a trailer."
      ],
      "correct": 3,
      "answerContent": "On approach to an area with a restricted view you should be extra careful and be prepared to react to a change in the traffic situation.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_am6Dx.png",
      "img_name": "card 721.png"
    },
    {
      "id": 722,
      "content": "What should a driver do when continuing straight ahead in the middle lane?",
      "labels": [4],
      "options": [
        "Take any lane as convenient.",
        "Take position in the right-hand lane even if proceeding straight ahead.",
        "Slow down and allow the driver in front to change lanes.",
        "Overtake the other vehicles quickly on the right-hand side."
      ],
      "correct": 3,
      "answerContent": "You should always keep a safe distance from the vehicle in front especially when it is slowing down or stopping.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_sSMMr.png",
      "img_name": "card 722.png"
    },
    {
      "id": 723,
      "content": "What should a driver do on the approach to this situation?",
      "labels": [4],
      "options": [
        "Reduce speed and stop if necessary.",
        "Increase speed in order to clear the bridge before the oncoming car.",
        "Drive on because the oncoming traffic must wait.",
        "Give way only if you are towing a trailer or caravan."
      ],
      "correct": 1,
      "answerContent": "When road priority is unclear you might have to yield to oncoming vehicles. Never drive a vehicle into an area that it might not be able to clear or where it could cause an obstruction or bottleneck.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_maQYO.png",
      "img_name": "card 723.png"
    },
    {
      "id": 724,
      "content": "When driving on a cobblestone road why should you take extra care?",
      "labels": [4],
      "options": [
        "The gaps between the stones helps road holding and grip is improved.",
        "The road surface is particularly even and tyre grip is improved.",
        "The smoothness of the cobblestones helps to improve grip.",
        "The road surface is uneven and road grip varies."
      ],
      "correct": 4,
      "answerContent": "Different road surfaces can affect your vehicles grip on the road and its stopping distances. You should be aware of this when driving on different surfaces.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_w4095.png",
      "img_name": "card 724.png"
    },
    {
      "id": 725,
      "content": "When driving on this one-way street with vehicles parked on both sides, what should a driver be prepared for?",
      "labels": [4],
      "options": [
        "The truck may be a left-hand drive vehicle.",
        "The truck may not have proper markings.",
        "Oncoming traffic as the driver overtakes the truck.",
        "A vehicle door may open on either side of the street."
      ],
      "correct": 4,
      "answerContent": "When driving on a one-way street, you should be extra careful and should be prepared to react to a change in the traffic situation.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_eZHtd.png",
      "img_name": "card 725.png"
    },
    {
      "id": 726,
      "content": "When driving on this one-way street with vehicles parked on both sides, what should a driver be prepared for?",
      "labels": [4],
      "options": [
        "Oncoming traffic as the driver overtakes the truck.",
        "The truck may be a left-hand drive vehicle.",
        "The truck may not have proper markings.",
        "Pedestrians crossing between the vehicles."
      ],
      "correct": 4,
      "answerContent": "When driving on a one-way street, you should be extra careful and be prepared to react to a change in the traffic situation.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_U4GNM.png",
      "img_name": "card 726.png"
    },
    {
      "id": 727,
      "content": "Why must a driver be particularly careful here?",
      "labels": [4],
      "options": [
        "Because there is an increased danger of skidding.",
        "Because a vehicle could come from the left.",
        "The vehicle coming from the right has the right of way.",
        "The vehicle coming from the right is not required to signal."
      ],
      "correct": 1,
      "answerContent": "Where there are fallen leaves on the road surface, your tyres might have reduced grip on the road surface and your braking distances might be greater.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_Xl9Q7.png",
      "img_name": "card 727.png"
    },
    {
      "id": 728,
      "content": "What should a driver do when turning right at this junction?",
      "labels": [4],
      "options": [
        "Allow the red car to proceed.",
        "Allow the blue car to proceed.",
        "Allow both cars to proceed.",
        "Proceed ahead of both cars."
      ],
      "correct": 1,
      "answerContent": "When you are turning right from a main road into a side road, you must give way to oncoming traffic on the main road even if they are turning left into the same road.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_gzZOl.png",
      "img_name": "card 728.png"
    },
    {
      "id": 729,
      "content": "What should a driver be aware of when driving at night along a shopping street with many different light sources?",
      "labels": [4],
      "options": [
        "Other vehicles do not need to use their head lights.",
        "It is easier to see pedestrians because of the bright lights.",
        "Parking spaces may be difficult to notice.",
        "Traffic lights may be difficult to distinguish from the other bright lights."
      ],
      "correct": 4,
      "answerContent": "When driving at night in an area where there is a variety of light sources, you need to be extra careful, as potential hazards might be more difficult to see.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_HvE3u.png",
      "img_name": "card 729.png"
    },
    {
      "id": 730,
      "content": "What should a driver do in this situation?",
      "labels": [4],
      "options": [
        "Maintain speed and not expect other children.",
        "Reduce speed and be prepared to stop as other children could follow.",
        "Sound the horn as a warning and proceed.",
        "Drive on quickly in order not to delay following traffic."
      ],
      "correct": 2,
      "answerContent": "You should always be aware of other road users especially children, who can be unpredictable and show no road sense. You should drive with extra care in areas where there are children about ? for example, near schools, playgrounds and in residential areas.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_1ND7M.png",
      "img_name": "card 730.png"
    },
    {
      "id": 731,
      "content": "In this situation who should wait?",
      "labels": [4],
      "options": [
        "The oncoming vehicle must wait.",
        "Neither vehicle should wait.",
        "The driver behind the stopped van should wait.",
        "Whichever vehicle is furthest away from the van."
      ],
      "correct": 3,
      "answerContent": "When you are overtaking a parked vehicle or obstruction, you should yield to oncoming vehicles so that they don't have to slow down or take evasive action.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_9syf8.png",
      "img_name": "card 731.png"
    },
    {
      "id": 732,
      "content": "In this situation, who should wait?",
      "labels": [4],
      "options": [
        "The driver in the red car should wait.",
        "Both drivers should wait.",
        "Neither driver should wait.",
        "The driver on the main road should wait."
      ],
      "correct": 1,
      "answerContent": "A vehicle driving on the main road has priority over vehicles emerging from side roads. However, you must understand that the right of way is not an absolute right of way and you should be considerate of other road users at all times.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_p1QV7.png",
      "img_name": "card 732.png"
    },
    {
      "id": 733,
      "content": "What should a driver do in this situation?",
      "labels": [4],
      "options": [
        "Accelerate quickly to clear the crossing.",
        "Allow the pedestrian to cross the road.",
        "Sound the horn and drive on.",
        "Continue ahead and overtake the blue van."
      ],
      "correct": 2,
      "answerContent": "When approaching a zebra crossing, you must yield to pedestrians already on or about to cross the road.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_ThDoQ.png",
      "img_name": "card 733.png"
    },
    {
      "id": 734,
      "content": "What should a driver be aware of in this situation?",
      "labels": [4],
      "options": [
        "A sharp dip in the road ahead.",
        "A dangerous right-hand bend ahead.",
        "A minor road to the right ahead.",
        "A minor road to the left ahead."
      ],
      "correct": 2,
      "answerContent": "You should always read the road ahead and be prepared to react to changing traffic situations ? in this case paying attention to the warning sign clearly indicating a right-hand bend ahead.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_6NnSb.png",
      "img_name": "card 734.png"
    },
    {
      "id": 735,
      "content": "Which vehicle is in the correct position to make a right turn from the major road into the minor road?",
      "labels": [4],
      "options": [
        "2",
        "1",
        "3",
        "4"
      ],
      "correct": 3,
      "answerContent": "The correct position from which to turn right from a major road to a minor road is just left of centre. You should take up the correct position in good time and avoid cutting the corner or swan necking ? that is going beyond the turning point as car 2 is in the picture.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_OBJxm.png",
      "img_name": "card 735.png"
    },
    {
      "id": 736,
      "content": "Which vehicle is in the correct position to make a right turn from a minor road onto a major road?",
      "labels": [4],
      "options": [
        "3",
        "4",
        "1",
        "2"
      ],
      "correct": 3,
      "answerContent": "The correct position from which to turn right from a minor road to a major road is just left of centre of the road. You should take up the correct position in good time and complete the turn by entering the left-hand side of the major road.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_CI6Pg.png",
      "img_name": "card 736.png"
    },
    {
      "id": 737,
      "content": "How does rain affect driving in this situation?",
      "labels": [4],
      "options": [
        "It increases tyre grip on the road.",
        "It increases visibility.",
        "It reduces the danger of skidding.",
        "It increases the danger of skidding."
      ],
      "correct": 4,
      "answerContent": "When it is wet, your tyres do not grip the road surface as well as when it is dry, your stopping distance is increased and you are more likely to skid. For these reasons you should slow down during or after rain and keep a greater distance from the vehicle in front.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_9hTBI.png",
      "img_name": "card 737.png"
    },
    {
      "id": 738,
      "content": "When driving on a road with tram lines why should a driver take extra care?",
      "labels": [4],
      "options": [
        "Driving on the tracks can improve braking.",
        "Driving on the tracks can reduce tyre grip.",
        "Driving on the tracks can improve tyre grip.",
        "Driving on the tracks can improve steering."
      ],
      "correct": 2,
      "answerContent": "Different road surfaces can affect your vehicles grip on the road and its stopping distances. You should be aware of this when driving on different surfaces.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_GTsyP.png",
      "img_name": "card 738.png"
    },
    {
      "id": 739,
      "content": "After a heavy downpour, why should a driver keep a greater distance from the vehicle in front?",
      "labels": [4],
      "options": [
        "Because wheels rotate at a greater speed after rain.",
        "Because wheels rotate at a slower speed after rain.",
        "Because the required stopping distances is greater.",
        "Because tyre grip improves when wet."
      ],
      "correct": 3,
      "answerContent": "On a wet road surface, your tyres do not grip the road surface as well as in dry conditions and your required stopping distance is increased. Because of that you should slow down during or after rain and keep a greater distance from the vehicle in front.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_z3oXp.png",
      "img_name": "card 739.png"
    },
    {
      "id": 740,
      "content": "What is the correct action to take in this situation?",
      "labels": [4],
      "options": [
        "Speed up to pass the children quickly.",
        "Keep a close eye on the children and be prepared to brake in good time.",
        "Drive closer to the left-hand side (nearside) and sound the horn.",
        "Continue to drive at the same speed."
      ],
      "correct": 2,
      "answerContent": "Because it is difficult to predict children's behaviour, you should always be prepared to react to a change in the traffic situation or to stop.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_i1Lw7.png",
      "img_name": "card 740.png"
    },
    {
      "id": 741,
      "content": "An approaching driver notices that the boy on the children's bicycle has said goodbye to his friend. What is the correct action for the driver to take?",
      "labels": [4],
      "options": [
        "Be prepared for the boy setting off at any moment.",
        "Slow down and beckon the boy to cross the road.",
        "Proceed as the boy is on the footpath.",
        "Stop the car until the boy has moved off."
      ],
      "correct": 1,
      "answerContent": "Because it is difficult to predict children's behaviour, you should always be prepared to react to a change in the traffic situation or to stop.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_zJ5nn.png",
      "img_name": "card 741.png"
    },
    {
      "id": 742,
      "content": "What should the car driver do in this situation?",
      "labels": [4],
      "options": [
        "The driver may turn right before the cyclist.",
        "The driver must allow the motorcyclist to proceed.",
        "The driver must allow the cyclist to proceed.",
        "The driver must stop and yield right of way to the other road users."
      ],
      "correct": 3,
      "answerContent": "When you are turning right from a major road to a minor road, you must yield to oncoming traffic, and you should proceed only when it is safe to do so.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_ZPOLY.png",
      "img_name": "card 742.png"
    },
    {
      "id": 743,
      "content": "What must a driver be prepared for in this situation?",
      "labels": [4],
      "options": [
        "The oncoming vehicle may swerve in your direction.",
        "The ball may burst after you have passed.",
        "A child could turn back to collect the ball from the roadway.",
        "The ball could damage your vehicle."
      ],
      "correct": 3,
      "answerContent": "Because it is difficult to predict children's behaviour, you should always be prepared to react to a change in the traffic situation and be prepared to stop.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_eqdJp.png",
      "img_name": "card 743.png"
    },
    {
      "id": 744,
      "content": "What should the driver do in this situation?",
      "labels": [4],
      "options": [
        "The cyclist must allow the other vehicles to proceed.",
        "The cyclist must proceed first.",
        "The driver must allow the van to cross the junction.",
        "The driver may continue ahead with caution."
      ],
      "correct": 4,
      "answerContent": "On approaching a crossroads you should check the road sign to see which traffic has priority and be prepared for emerging traffic from either side. Vehicles do not have an automatic right of way on the road. The overriding rule is to proceed with caution in all circumstances. .",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_jGROR.png",
      "img_name": "card 744.png"
    },
    {
      "id": 745,
      "content": "What should the driver do in this situation?",
      "labels": [4],
      "options": [
        "The driver is not allowed to turn right.",
        "The driver must turn left.",
        "The driver must allow the orange car to cross.",
        "The driver may turn right."
      ],
      "correct": 4,
      "answerContent": "You may turn right if there no oncoming traffic but you should also be aware that there might be traffic emerging from the minor roads.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_NNQFP.png",
      "img_name": "card 745.png"
    },
    {
      "id": 746,
      "content": "What should a driver be aware of in this situation?",
      "labels": [4],
      "options": [
        "The tram may move away without warning.",
        "The pedestrian always has the right of way to cross in front of traffic.",
        "There is no danger as the tram is on rails.",
        "The pedestrian may leave the traffic island without paying attention."
      ],
      "correct": 4,
      "answerContent": "You should read the road ahead and expect extra pedestrian activity when the tram is at the stop.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_4Mwlf.png",
      "img_name": "card 746.png"
    },
    {
      "id": 747,
      "content": "What should the driver allow for when following the bus on an icy road?",
      "labels": [4],
      "options": [
        "A shorter braking distance is required.",
        "Same braking distance as in dry conditions.",
        "Same braking distance as in wet conditions.",
        "A longer braking distance is required."
      ],
      "correct": 4,
      "answerContent": "When driving in icy conditions, you should always reduce speed and allow a bigger gap to the vehicle in front in order to be able to stop safely if necessary.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_gP1kC.png",
      "img_name": "card 747.png"
    },
    {
      "id": 748,
      "content": "What lights should a driver use in dense fog?",
      "labels": [4],
      "options": [
        "Front and rear fog lights along with hazard warning lights.",
        "Front and rear fog lights along with main beam lights.",
        "Front and rear fog lights along with dipped headlights.",
        "Front and rear fog lights along with side lights."
      ],
      "correct": 3,
      "answerContent": "When driving in dense fog you should switch on your front and rear fog lights along with dipped headlights. You should not drive in fog with main beam headlights on.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_NWYeb.png",
      "img_name": "card 748.png"
    },
    {
      "id": 749,
      "content": "What should the driver be most conscious of in this situation?",
      "labels": [4],
      "options": [
        "No vehicles should be parked on the left hand side of the road.",
        "One of the parked vehicles may reverse into the driver's path.",
        "The pedestrian may suddenly cross the road in front of the vehicle.",
        "The pedestrian always has right of way to cross the road."
      ],
      "correct": 3,
      "answerContent": "It is often difficult to predict other road users behaviour. Where there are parked vehicles on both sides of the road you should approach with caution, and be prepared to react to a change in the traffic situation and to stop.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_2tYh6.png",
      "img_name": "card 749.png"
    },
    {
      "id": 750,
      "content": "What should the driver do when approaching this situation?",
      "labels": [4],
      "options": [
        "The driver should maintain current speed and reduce distance from the silver car.",
        "The driver may overtake the car and the girl as the road is marked with a broken white line.",
        "Reduce speed and remain ready to brake since the girl on the footpath could suddenly cross the road.",
        "The driver should be prepared for the vehicle in front to increase speed."
      ],
      "correct": 3,
      "answerContent": "It is often difficult to predict other road users behaviour. You should be prepared in case the pedestrian steps onto the road and the silver car stops suddenly.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_NeSbw.png",
      "img_name": "card 750.png"
    },
    {
      "id": 751,
      "content": "What should a driver be aware of in this situation?",
      "labels": [4],
      "options": [
        "The cyclist may move onto the roadway without paying attention to moving traffic.",
        "The cyclist will stop at the end of the cycle path to allow traffic to pass by.",
        "The cyclist will stay on the cycle path.",
        "A driver should move to the left-hand side (nearside) in case the cyclist moves out."
      ],
      "correct": 1,
      "answerContent": "You should show extra care when approaching cyclists who are about to exit from a cycle lane and join the roadway.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_WyAyY.png",
      "img_name": "card 751.png"
    },
    {
      "id": 752,
      "content": "Why might it be dangerous to drive on a poorly-lit street?",
      "labels": [4],
      "options": [
        "Traffic lights will not be working.",
        "Drivers can only see the traffic coming against them.",
        "Pedestrians crossing in a dark area might be difficult to see.",
        "Drivers can only see the traffic in front of them."
      ],
      "correct": 3,
      "answerContent": "When you are driving along a poorly-lit street, you should take extra care ? vulnerable road users such as pedestrians might not be so easy to see. You should always be prepared to react to a change in the traffic situation.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_iTN5K.png",
      "img_name": "card 752.png"
    },
    {
      "id": 753,
      "content": "The driver intends to turn right at this junction - what should the driver do?",
      "labels": [4],
      "options": [
        "Proceed after the motorcycle only.",
        "Proceed in front of the bus and motorcyclist.",
        "Proceed after the motorcycle and bus have passed.",
        "Proceed in front of the bus only."
      ],
      "correct": 3,
      "answerContent": "When you are turning right at a junction, you should yield to traffic on the major road, and to oncoming traffic at the junction.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_5mZ7c.png",
      "img_name": "card 753.png"
    },
    {
      "id": 754,
      "content": "What should a driver do if dazzled by the lights of an oncoming vehicle?",
      "labels": [4],
      "options": [
        "Flash the oncoming vehicle and move to the left.",
        "Look to the left-hand edge (nearside) of the roadway and slow down if necessary.",
        "Accelerate to get out of range of light as quickly as possible.",
        "Dazzle the oncoming vehicle with their own main beam and move to the right."
      ],
      "correct": 2,
      "answerContent": "If you are dazzled by the lights of oncoming traffic, turn your eyes to the left edge (nearside) of the road. If necessary, stop and allow your eyes to recover before driving on.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_n0tCZ.png",
      "img_name": "card 754.png"
    },
    {
      "id": 755,
      "content": "When intending to turn right as shown, what should the car driver do?",
      "labels": [4],
      "options": [
        "Wait and allow the truck to proceed first.",
        "Wait and allow the truck and the oncoming vehicle to proceed first.",
        "Wait and allow the oncoming vehicle to pass.",
        "Continue with care as the driver has right of way."
      ],
      "correct": 3,
      "answerContent": "When you are turning right from a main road onto a side road, you must by law give way to oncoming traffic on the main road.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_x7nN6.png",
      "img_name": "card 755.png"
    },
    {
      "id": 756,
      "content": "What should a driver be aware of when following the motorcyclist, and the white car is reversing onto the road?",
      "labels": [4],
      "options": [
        "The driver following the motorcycle may need a longer braking distance than normal.",
        "The reversing driver will stop when they see the motorcyclist.",
        "The brake lights on the motorcycle may not be working.",
        "The motorcyclist may signal the reversing driver to stop."
      ],
      "correct": 1,
      "answerContent": "You should always keep a safe distance from the vehicle in front if it is slowing down or stopping. Always read the road and be prepared to react correctly to changes in the traffic ahead.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_TDNfn.png",
      "img_name": "card 756.png"
    },
    {
      "id": 757,
      "content": "After a heavy downpour, why should a driver keep a greater distance from the vehicle in front?",
      "labels": [4],
      "options": [
        "Because required stopping distances are decreased.",
        "Because wheels rotate at a greater speed after rain.",
        "Because wheels rotate at a slower speed after rain.",
        "Because wheel-spray may impair visibility."
      ],
      "correct": 4,
      "answerContent": "Heavy rain can affect how well you can see and how well you can be seen by other road users. Because of that you should slow down in heavy rain and keep a greater distance from the vehicle in front.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_BtlA8.png",
      "img_name": "card 757.png"
    },
    {
      "id": 758,
      "content": "What should a driver do in this situation when intending to turn left?",
      "labels": [4],
      "options": [
        "Stop and beckon both pedestrians to cross.",
        "Yield to pedestrians already crossing.",
        "Sound the horn and accelerate to proceed promptly.",
        "Proceed between both pedestrians."
      ],
      "correct": 2,
      "answerContent": "By law you must yield to pedestrians already crossing at a junction. Pedestrians are vulnerable road users and you should be extra careful driving at places where pedestrians are attempting to cross the road.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_G9cmZ.png",
      "img_name": "card 758.png"
    },
    {
      "id": 759,
      "content": "What should the car driver be aware of in this situation?",
      "labels": [4],
      "options": [
        "Slowing down and being prepared to react.",
        "Road marking is taking place ahead.",
        "The road ahead becomes a dual carriageway.",
        "Following traffic may cut the corner."
      ],
      "correct": 1,
      "answerContent": "When you are approaching a bend or corner with a restricted view you should slow down if necessary and be prepared to react to any changes in the traffic situation.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_Y3vGw.png",
      "img_name": "card 759.png"
    },
    {
      "id": 760,
      "content": "What should a driver be most aware of in this situation?",
      "labels": [4],
      "options": [
        "One of the parked vehicles may reverse into the driver's path.",
        "A car might appear unexpectedly at the brow of the hill.",
        "Children may unexpectedly run out from between parked cars.",
        "Parking opposite double yellow lines is prohibited."
      ],
      "correct": 3,
      "answerContent": "When driving in a residential area you need to take account of the danger you might pose to children playing. You should always observe warning signs relating to children and drive accordingly.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_55awe.png",
      "img_name": "card 760.png"
    },
    {
      "id": 761,
      "content": "What should a driver who wants to turn right do in this situation?",
      "labels": [4],
      "options": [
        "Proceed straight ahead and take a wide turn to the right.",
        "Turn right from the left lane.",
        "Proceed straight ahead or turn left.",
        "Reverse and get into the right lane."
      ],
      "correct": 3,
      "answerContent": "As you approach a junction where you want to turn right, you should read the road ahead and take up the correct position for turning in good time.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_8Q3Ka.png",
      "img_name": "card 761.png"
    },
    {
      "id": 762,
      "content": "What does this dial provide information on?",
      "labels": [4],
      "options": [
        "Fuel level.",
        "Oil Level.",
        "Gearbox revolution.",
        "Engine revolution."
      ],
      "correct": 4,
      "answerContent": "The rev counter measures the speed of the engine, in revolutions per minute. Generally, the higher the revs, the more fuel the engine is using, so drivers should keep an eye on the rev counter to help drive in a more eco-friendly manner.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_bbn66.png",
      "img_name": "card 762.png"
    },
    {
      "id": 763,
      "content": "What does a rev counter provide information on?",
      "labels": [4],
      "options": [
        "Engine revolutions.",
        "Wheel revolutions.",
        "Gear box revolutions.",
        "Heater-fan revolutions."
      ],
      "correct": 1,
      "answerContent": "The rev counter measures the speed of the engine, in revolutions per minute. Generally, the higher the revs, the more fuel the engine is using, so drivers should keep an eye on the rev counter to help drive in a more eco-friendly manner.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_jvL0s.png",
      "img_name": "card 763.png"
    },
    {
      "id": 764,
      "content": "In this situation, what should the driver in the right-hand lane of the dual carriageway be aware of?",
      "labels": [4],
      "options": [
        "Increased visibility.",
        "Crosswinds may blow the rider into their path.",
        "Oncoming traffic.",
        "The motorcyclist may perform a U-turn."
      ],
      "correct": 2,
      "answerContent": "When driving in wet and windy conditions, a driver should be aware that these conditions can affect the stability of vulnerable road users such as motorcyclists or cyclists. These road users may be blown into the driver's path particularly in open and exposed areas.",
      "img_src": "http://d1fohtyzq6kn2t.cloudfront.net/img/quiz-img/a_TRBdh.png",
      "img_name": "card 764.png"
    },
    {
      "id": 765,
      "content": "What does the warning light and/or red zone on a fuel gauge mean?",
      "labels": [5],
      "options": [
        "The level of fuel in the tank is low.",
        "The fuel tank has been over-filled.",
        "There is a leak in the fuel system.",
        "There is leaded fuel in the tank."
      ],
      "correct": 1,
      "answerContent": "Many vehicles are fitted with various warning lights and gauges. A red zone or a warning light on a fuel gauge means the vehicle is low in fuel and should be refuelled as soon as possible."
    },
    {
      "id": 766,
      "content": "What does the speed rating of a tyre indicate?",
      "labels": [5],
      "options": [
        "The maximum speed for which the tyre is designed.",
        "The minimum speed for which the tyre is designed.",
        "The maximum speed the vehicle can overtake at.",
        "The maximum speed the vehicle can be driven at."
      ],
      "correct": 1,
      "answerContent": "The speed rating of a tyre is the maximum speed for which the tyre is designed. This relates to the speed capability of the tyre. It does not relate to the speed at which the tyre should or could legally be driven."
    },
    {
      "id": 767,
      "content": "On a motorway, when should a driver use the hazard warning lights?",
      "labels": [5],
      "options": [
        "When driving on the hard shoulder.",
        "When slowing down quickly because of danger ahead.",
        "When another vehicle is following too closely.",
        "When towing another vehicle."
      ],
      "correct": 2,
      "answerContent": "Use the hazard warning lights to warn other road users of a danger ahead. For example, if you have to slow down sharply because of a build-up of traffic ahead, you can use the hazard warning lights to warn following vehicles that they need to slow down."
    },
    {
      "id": 768,
      "content": "What should a driver do if the fuel system becomes air-locked?",
      "labels": [5],
      "options": [
        "Bleed the air out of the fuel system.",
        "Drain the fuel filter.",
        "Loosen the fuel pump.",
        "Tighten the injector pipes."
      ],
      "correct": 1,
      "answerContent": "The fuel system can become air-locked if you let the fuel get too low or if there is a leak in the system. You should have the problem corrected before driving. The solution may be as simple as bleeding the fuel system to release the air."
    },
    {
      "id": 769,
      "content": "Under what circumstances could both cross-ply and radial tyres be fitted to a vehicle?",
      "labels": [5],
      "options": [
        "When heavy loads are being carried.",
        "When towing a trailer in snow.",
        "When driving in slippery road conditions.",
        "When each type is fitted on a different axle."
      ],
      "correct": 4,
      "answerContent": "In general, you should fit the same type of tyres all round the vehicle. However if you need to fit a mix of cross-ply and radials, the tyres on any axle should be of the same type."
    },
    {
      "id": 770,
      "content": "When a driver operates the indicator switch and hears a more rapid clicking noise than normal, what could this mean?",
      "labels": [5],
      "options": [
        "The voltage regulator is not functioning properly.",
        "An indicator bulb may have blown.",
        "The hazard warning light switch is faulty.",
        "The hazard warning lights are on."
      ],
      "correct": 2,
      "answerContent": "A rapid clicking noise when you turn on an indicator is usually a sign that one of the indicator bulbs has failed. Drivers are responsible for making sure that their vehicle is roadworthy. This should include a regular check that all lights, reflectors and indicators, are working properly."
    },
    {
      "id": 771,
      "content": "What does Anti-lock braking system (ABS) do?",
      "labels": [5],
      "options": [
        "ABS prevents the wheels from locking under harsh braking conditions.",
        "ABS deploys the airbags during a collision.",
        "ABS displays the name of the radio station playing on the car radio.",
        "ABS locks the brakes to prevent skidding during harsh braking."
      ],
      "correct": 1,
      "answerContent": "Anti-lock braking system (ABS) is a type of braking system found in most modern cars. It comes into play automatically when the driver brakes harshly. In the wet it can help prevent the wheels from skidding so that, if necessary, the driver can continue to steer while braking. Be aware that ABS does not reduce the braking distance."
    },
    {
      "id": 772,
      "content": "If driving a vehicle with automatic transmission, what in particular should a driver be aware of?",
      "labels": [5],
      "options": [
        "That the gear box may overheat while being driven in low gear.",
        "That engine braking power is reduced.",
        "That driving on a motorway is not permitted.",
        "That wheel-spin occurs more often."
      ],
      "correct": 2,
      "answerContent": "When driving an automatic vehicle, it may not slow at the same rate as a vehicle with a manual gearbox when the driver releases the accelerator. Drivers should be aware of this, as they may need to apply the brake earlier in order to stop where required."
    },
    {
      "id": 773,
      "content": "What effect does automatic transmission have on engine braking power?",
      "labels": [5],
      "options": [
        "It reduces it.",
        "It transfers the braking ability to the handbrake.",
        "Its transfers the braking ability to all the wheels.",
        "It increases it."
      ],
      "correct": 1,
      "answerContent": "When driving an automatic vehicle, it may not slow at the same rate as a vehicle with a manual gearbox when the driver releases the accelerator. Drivers should be aware of this, as they may need to apply the brake earlier in order to stop where required."
    },
    {
      "id": 774,
      "content": "If the oil pressure gauge shows little or no pressure, or the warning light comes on, what could the problem be?",
      "labels": [5],
      "options": [
        "The oil level is too high.",
        "The oil is too thick.",
        "The oil level is too low.",
        "The oil is too cold."
      ],
      "correct": 3,
      "answerContent": "Drivers should check the oil level in their vehicle regularly, and if it is low, top it up. If it needs to be topped up very often, have the vehicle checked by a competent person to see if there is a problem."
    },
    {
      "id": 775,
      "content": "What may happen if the vehicle's engine oil is not changed as required?",
      "labels": [5],
      "options": [
        "Parts of the engine may suffer increased wear.",
        "The vehicle's fuel consumption may increase.",
        "The vehicle's fuel consumption may decrease.",
        "The engine may overheat."
      ],
      "correct": 1,
      "answerContent": "Engine oil becomes inefficient over time, losing its viscosity and lubricating qualities, and therefore must be changed as required in accordance with the manufacturer's recommendations. Failure to do so may result in costly and extensive engine damage. The oil change is usually done when the vehicle is being serviced."
    },
    {
      "id": 776,
      "content": "If a vehicle is driven with low oil pressure, what effect does this have on its engine?",
      "labels": [5],
      "options": [
        "It increases fuel consumption.",
        "It increases fuel efficiency.",
        "It increases wear and tear on the engine.",
        "It increases exhaust emissions."
      ],
      "correct": 3,
      "answerContent": "Low oil pressure is usually related to low oil level or to a faulty oil pump. Low engine oil level should be topped up in accordance with the manufacturer's recommendations. Failure to do so may result in costly and extensive engine damage."
    },
    {
      "id": 777,
      "content": "If the vehicle's oil-pressure gauge is reading low or the red oil-pressure warning light comes on, what should a driver do?",
      "labels": [5],
      "options": [
        "Drive at lower speeds until the oil level is topped up.",
        "Drive in a low gear until the oil level is topped up.",
        "Drive at a faster pace to reach the destination before the oil runs out.",
        "Drive to a safe place, stop the vehicle and check the oil level."
      ],
      "correct": 4,
      "answerContent": "Oil circulation is essential for the safe running of the vehicles engine. If the warning lights or gauges indicate that the oil or the oil-pressure is low, the driver should stop as soon as they can in safe place, check the oil level, and top up if necessary. Continuing to drive may damage the engine. If the problem is not just related to the oil level, have the vehicle checked by a competent person."
    },
    {
      "id": 778,
      "content": "What should a driver do before checking the engine oil level on a vehicle?",
      "labels": [5],
      "options": [
        "Make sure that the engine is switched on and hot.",
        "Make sure that the engine is running.",
        "Make sure that the engine is switched off and cold.",
        "Make sure that the vehicle is in a low gear."
      ],
      "correct": 3,
      "answerContent": "Drivers need a basic knowledge of the regular checks that should be carried out on their vehicle. Checking the engine oil level is important ? do this with the vehicle parked on level ground with the engine switched off and cold for a more accurate reading. Refer to the vehicle handbook for further information and guidance."
    },
    {
      "id": 779,
      "content": "What is the purpose of engine oil?",
      "labels": [5],
      "options": [
        "It lubricates the braking system.",
        "It lubricates the exhaust system.",
        "It lubricates the engine.",
        "It lubricates the wheel bearings."
      ],
      "correct": 3,
      "answerContent": "The purpose of engine oil is to lubricate and cool the moving parts of the engine. Refer to the vehicle handbook for further information and guidance."
    },
    {
      "id": 780,
      "content": "When is it recommended to use coolant?",
      "labels": [5],
      "options": [
        "Summer only.",
        "In petrol engines only.",
        "All year round.",
        "Winter only."
      ],
      "correct": 3,
      "answerContent": "The purpose of coolant is to keep the engine cool during operation. Coolant is usually a mixture of water and anti-freeze ? this ensures that the engine is kept cool and that the coolant does not freeze in very cold weather."
    },
    {
      "id": 781,
      "content": "What happens if the vehicle has a flat battery?",
      "labels": [5],
      "options": [
        "The engine will not start.",
        "The battery will have to be replaced.",
        "The battery will leak acid into the engine.",
        "The head light bulbs will have to be replaced."
      ],
      "correct": 1,
      "answerContent": "All motor vehicles have a battery to supply power, primarily to start the engine. If the battery is flat, the driver will not be able to start the engine in the normal way. When the engine is running, it produces its own electricity to recharge the battery and run the various electrical components, including lights, heating, the radio and so on. If the battery is completely dead it will have to be replaced."
    },
    {
      "id": 782,
      "content": "What is the primary purpose of the battery fitted to a petrol - or diesel - powered motor vehicle?",
      "labels": [5],
      "options": [
        "To provide braking.",
        "To reduce fuel consumption.",
        "To provide heat to the engine.",
        "To start the engine."
      ],
      "correct": 4,
      "answerContent": "The primary purpose of the battery is to start the engine. When the engine is running, it produces its own electricity to charge the battery and run the various electrical components, including lights, heating, radio and so on."
    },
    {
      "id": 783,
      "content": "What effect would a weak battery have on a vehicle's driving performance?",
      "labels": [5],
      "options": [
        "The headlights would not function.",
        "Uphill acceleration would be reduced.",
        "It would have no effect.",
        "The fuel would burn less efficiently."
      ],
      "correct": 3,
      "answerContent": "It might be difficult to start a car with a weak battery, but once the engine is running, it makes no difference. If the battery fails to charge or maintain its full charge seek advice from a competent person."
    },
    {
      "id": 784,
      "content": "What effect can a worn shock absorber have on a vehicle?",
      "labels": [5],
      "options": [
        "It can cause an electrical short-circuit.",
        "It can cause the vehicle to 'bounce? in an unstable manner.",
        "It can trigger the release of the airbags.",
        "It can increase fuel consumption."
      ],
      "correct": 2,
      "answerContent": "A worn shock absorber can seriously affect the control of the vehicle especially on uneven surfaces or when cornering and can cause unnecessary wear and tear on tyres. It may increase stopping distance by not keeping the tyres in proper contact with the road under harsh braking."
    },
    {
      "id": 785,
      "content": "Why should the valve be replaced when having a tubeless tyre fitted?",
      "labels": [5],
      "options": [
        "To ensure the wheel remains aligned.",
        "To ensure the tyre will remain inflated.",
        "To ensure the wheel remains balanced.",
        "To ensure the wheel nuts remain tight."
      ],
      "correct": 2,
      "answerContent": "When fitting a new tubeless tyre to a vehicle it is recommended to change the valve. This is because the old valve has been on the wheel since the old tyre was fitted. The old valve may break down, leak or cause air to escape."
    },
    {
      "id": 786,
      "content": "What effect does low tyre-pressure have on a vehicle?",
      "labels": [5],
      "options": [
        "The vehicle accelerates faster.",
        "The engine noise increases.",
        "Braking and cornering are impaired.",
        "The brakes can overheat."
      ],
      "correct": 3,
      "answerContent": "Incorrect tyre pressure adversely affects many of a vehicles systems, including suspension, steering and fuel consumption. In particular, under-inflated tyres can affect the vehicles braking ability and its effectiveness when cornering. Tyres should always be inflated according to the vehicle manufacturers guidelines, information on which can be found in the vehicle handbook."
    },
    {
      "id": 787,
      "content": "What is an effect of under-inflated tyres on a vehicle?",
      "labels": [5],
      "options": [
        "Improved fuel economy and braking.",
        "Improved braking and steering.",
        "Increased wear on the vehicle's engine.",
        "Impaired braking and steering."
      ],
      "correct": 4,
      "answerContent": "Drivers should check their vehicle's tyre pressures (including the spare) regularly at least once a week. Under-inflated tyres adversely affect many of a vehicle's systems, including braking ability, suspension, steering, fuel consumption and premature tyre wear. Tyres should always be inflated according to the vehicle manufacturers guidelines, information on which can be found in the vehicle handbook."
    },
    {
      "id": 788,
      "content": "When driving, where should a driver rest their left foot?",
      "labels": [5],
      "options": [
        "Under the clutch pedal.",
        "On the clutch pedal.",
        "On the floor or foot rest.",
        "Under the brake pedal."
      ],
      "correct": 3,
      "answerContent": "When driving a driver should rest their left foot on the floor or foot rest but not under the pedals. To do so may cause delayed response time in an emergency. Resting the foot on the pedal may result in coasting, which may inadvertently increase the speed of the vehicle, or clutch mechanism damage."
    },
    {
      "id": 789,
      "content": "While driving at higher speeds, what does a continuous vibration in the steering indicate?",
      "labels": [5],
      "options": [
        "The steering is out of alignment.",
        "The wheel balance is uneven.",
        "The shock absorbers are worn.",
        "Weight distribution is uneven."
      ],
      "correct": 2,
      "answerContent": "If a driver feels a continuous vibration in the steering, particularly at higher speeds, this could typically indicate that the balance of the vehicle wheels is uneven. This can lead to instability in the handling of the vehicle. If this is the case, have it investigated by a competent person."
    },
    {
      "id": 790,
      "content": "After changing a wheel on a vehicle, which of the following should be checked after a short distance?",
      "labels": [5],
      "options": [
        "The tyre air valve.",
        "The brake pad clearance.",
        "The wheel nut tightness.",
        "The tyre tread depth."
      ],
      "correct": 3,
      "answerContent": "After changing a wheel on a vehicle, check the tightness of the wheel nuts or studs on the replacement wheel after driving a short distance to ensure they are securely fitted. If in doubt seek assistance from a competent person."
    },
    {
      "id": 791,
      "content": "What can be affected by driving on under-inflated tyres?",
      "labels": [5],
      "options": [
        "Climate control system.",
        "Braking ability.",
        "The exhaust system.",
        "Engine temperature."
      ],
      "correct": 2,
      "answerContent": "Under-inflated tyres may adversely affect many of the vehicle's systems, including its braking ability, suspension, steering and fuel consumption. In particular, under-inflated tyres can affect the vehicles braking ability and can result in premature tyre wear. Tyres should always be inflated according to the vehicle manufacturers guidelines, information on which can be found in the vehicle handbook."
    },
    {
      "id": 792,
      "content": "In general, above what gross vehicle weight must a trailer have brakes fitted?",
      "labels": [5],
      "options": [
        "850\xA0kg",
        "500\xA0kg",
        "750\xA0kg",
        "900\xA0kg"
      ],
      "correct": 3,
      "answerContent": "Brakes must be fitted to a trailer if its gross vehicle weight exceeds either 750\xA0kg or half the weight of the towing vehicle."
    }
  ];

  // src/scripts/cards.ts
  var cards_map = new Map();
  var labels_map = new Map();
  var cards_nextID = 1;
  var cards_nextLabelID = 1;
  function cards_init() {
    cards_map.clear();
    for (let card of sourceCards)
      cards_map.set(card.id, card);
    cards_nextID = sourceCards.length + 1;
    labels_map.clear();
    for (let label of sourceLabels)
      labels_map.set(label.id, label);
    cards_nextLabelID = sourceLabels.length + 1;
  }
  function cards_add(card) {
    cards_map.set(card.id, card);
    cardview_onCardsChanged();
  }
  function cards_get(cardID) {
    return cards_map.get(cardID);
  }
  function cards_getAll() {
    return cards_map.values();
  }
  function cards_exists(cardID) {
    return cards_map.has(cardID);
  }
  function cards_delete(cardID) {
    cards_map.delete(cardID);
    cardview_onCardsChanged();
  }
  function cards_getIDs() {
    return cards_map.keys();
  }
  function cards_createNewLabel() {
    const newLabel = { "id": cards_nextLabelID };
    cards_nextLabelID++;
    cards_addLabel(newLabel);
    return newLabel;
  }
  function cards_addLabel(label) {
    labels_map.set(label.id, label);
  }
  function cards_getLabel(labelID) {
    return labels_map.get(labelID);
  }
  function cards_getLabels() {
    return [...labels_map.values()];
  }
  function cards_deleteLabel(label) {
    [...cards_getAll()].forEach((item) => {
      const labels = item.labels;
      const index = labels.indexOf(label.id);
      if (index >= 0)
        item.labels.splice(index, 1);
    });
    labels_map.delete(label.id);
  }

  // src/scripts/keyboard.ts
  var keyboard_modifiers = [
    "Shift",
    "Control",
    "Alt",
    "AltGraph"
  ];
  var keyboard_shortcuts = [];
  var keyboard_keyMap = new Map();
  function keyboard_init() {
    document.addEventListener("keydown", keyboard_handleEvent);
    keyboard_addShortcut({
      "key": "h",
      "modifiers": ["Shift", "Control"],
      "action": function() {
        console.log("Hello from the Example Shortcut, World!");
      },
      "allowWhileEditingInput": false
    });
  }
  function keyboard_addShortcut(shortcut) {
    if (!shortcut.key) {
      console.log("Attempted to register shortcut without a key");
      console.log(shortcut);
      return;
    }
    if (!shortcut.action) {
      console.log("Attempted to register shortcut without an action");
      console.log(shortcut);
      return;
    }
    let id = 1;
    for (let item of keyboard_shortcuts)
      if (item.id >= id)
        id = item.id + 1;
    shortcut.id = id;
    keyboard_shortcuts.push(shortcut);
    if (!(shortcut.key instanceof Array))
      shortcut.key = [shortcut.key];
    for (let key of shortcut.key) {
      key = key.toLowerCase();
      if (!keyboard_keyMap.has(key))
        keyboard_keyMap.set(key, []);
      keyboard_keyMap.get(key).push(shortcut);
    }
    shortcut.modifiers || (shortcut.modifiers = []);
    if (!(shortcut.modifiers instanceof Array))
      shortcut.modifiers = [shortcut.modifiers];
    shortcut.modifiers = shortcut.modifiers.map(keyboard_checkModifierText);
  }
  function keyboard_checkModifierText(text) {
    text = text.toLowerCase();
    if (text === "alt")
      return "Alt";
    else if (text === "altgr" || text === "altgraph")
      return "AltGraph";
    else if (text === "ctrl" || text === "control")
      return "Control";
    else if (text === "meta")
      return "Meta";
    else if (text === "shift")
      return "Shift";
  }
  function keyboard_handleEvent(event) {
    const shortcuts = keyboard_keyMap.get(event.key.toLowerCase());
    if (!shortcuts)
      return;
    for (let shortcut of shortcuts) {
      if (shortcut.modifiers.length === 0 && !shortcut.allowWhileEditingInput) {
        const $focus = $(":focus");
        if ($focus.is("input") || $focus.attr("contenteditable"))
          continue;
      }
      const modifiersMatch = keyboard_modifiers.every(function(mod) {
        const requirement = shortcut.modifiers.includes(mod);
        const current = event.getModifierState(mod);
        return requirement === current;
      });
      if (modifiersMatch) {
        shortcut.action();
        event.stopPropagation();
        event.preventDefault();
        break;
      }
    }
  }

  // src/scripts/undo-redo.ts
  var undoRedo_past = [];
  var undoRedo_future = [];
  function undoRedo_init() {
    keyboard_addShortcut({
      "key": "z",
      "modifiers": "ctrl",
      "action": undoRedo_undo,
      "allowWhileEditingInput": true
    });
    keyboard_addShortcut({
      "key": "y",
      "modifiers": "ctrl",
      "action": undoRedo_redo,
      "allowWhileEditingInput": true
    });
    keyboard_addShortcut({
      "key": "z",
      "modifiers": ["ctrl", "shift"],
      "action": undoRedo_redo,
      "allowWhileEditingInput": true
    });
  }
  function undoRedo_do(action) {
    action.name || (action.name = "(No Name)");
    action.tryContinue || (action.tryContinue = () => false);
    action.do();
    let continued = false;
    if (undoRedo_past.length > 0) {
      const previous = undoRedo_past[undoRedo_past.length - 1];
      if (previous.continueGroup === action.continueGroup)
        continued = previous.tryContinue(action);
    }
    if (!continued)
      undoRedo_past.push(action);
    undoRedo_future.length = 0;
  }
  function undoRedo_undo() {
    if (undoRedo_past.length === 0)
      return;
    const action = undoRedo_past.pop();
    action.undo();
    undoRedo_future.push(action);
  }
  function undoRedo_redo() {
    if (undoRedo_future.length === 0)
      return;
    const action = undoRedo_future.pop();
    action.do();
    undoRedo_past.push(action);
  }
  function undoRedo_editProperty(target, propertyName, newValue, callback, combine = false) {
    const oldValue = target[propertyName];
    undoRedo_do({
      "do": function() {
        target[propertyName] = newValue;
        if (callback)
          callback();
      },
      "undo": function() {
        target[propertyName] = oldValue;
        if (callback)
          callback();
      },
      "continueGroup": "undoRedo_editProperty",
      "target": target,
      "propertyName": propertyName,
      "newValue": newValue,
      "callback": callback,
      "tryContinue": (next) => {
        if (!combine)
          return false;
        if (target !== next.target || propertyName !== next.propertyName)
          return false;
        newValue = next.newValue;
        callback = next.callback;
        return true;
      }
    });
  }
  function undoRedo_deleteListItem(target, index, callback) {
    const value = target[index];
    undoRedo_do({
      "do": function() {
        target.splice(index, 1);
        if (callback)
          callback();
      },
      "undo": function() {
        target.splice(index, 0, value);
        if (callback)
          callback();
      }
    });
  }
  function undoRedo_pushListItem(target, value, callback) {
    undoRedo_do({
      "do": function() {
        target.push(value);
        if (callback)
          callback();
      },
      "undo": function() {
        target.pop(value);
        if (callback)
          callback();
      }
    });
  }
  function undoRedo_deleteCard(cardID) {
    const page = cardview_pageOf(cardID);
    const card = cards_get(cardID);
    undoRedo_do({
      "do": () => {
        if (page !== -1)
          cardview_removeCard(page);
        cards_delete(cardID);
      },
      "undo": () => {
        cards_add(card);
        if (page !== -1)
          cardview_addCardID(cardID);
      }
    });
  }
  function undoRedo_createNewLabel(callback) {
    let label;
    undoRedo_do({
      "do": function() {
        label = cards_createNewLabel();
        if (callback)
          callback();
      },
      "undo": function() {
        cards_deleteLabel(label);
        if (callback)
          callback();
      }
    });
  }
  function undoRedo_deleteLabel(labelID, callback) {
    const labelledCards = sourceCards.filter((x) => x.labels.includes(labelID));
    const label = cards_getLabel(labelID);
    undoRedo_do({
      "do": function() {
        cards_deleteLabel(label);
        if (callback)
          callback();
      },
      "undo": function() {
        cards_addLabel(label);
        labelledCards.forEach((x) => x.labels.push(labelID));
        if (callback)
          callback();
      }
    });
  }

  // src/scripts/card-view.ts
  var cardview_index = [];
  var cardview_page = 1;
  var cardview_editing = false;
  function cardview_onCardsChanged() {
    cardview_setCardIDs(cardview_index.filter(cards_exists));
  }
  function cardview_setCardIDs(index) {
    cardview_index = index;
    cardview_onCardIDsChanged();
  }
  function cardview_onCardIDsChanged() {
    $(".cardview-total-pages").text(cardview_index.length);
    cardview_checkPage();
    cardview_refreshPage();
  }
  function cardview_addCardID(cardID, page = void 0) {
    page || (page = cardview_page);
    cardview_index.splice(page - 1, 0, cardID);
    cardview_onCardIDsChanged();
  }
  function cardview_removeCard(page = void 0) {
    page || (page = cardview_page);
    cardview_index.splice(page - 1, 1);
    cardview_onCardIDsChanged();
  }
  function cardview_pageOf(cardID) {
    return cardview_index.indexOf(cardID) + 1;
  }
  function cardview_getCurrentCardID() {
    if (cardview_index.length === 0)
      return void 0;
    return cardview_index[cardview_getPage() - 1];
  }
  function cardview_getCurrentCard() {
    const index = cardview_getCurrentCardID();
    if (!index)
      return void 0;
    return cards_get(index);
  }
  function cardview_getPageCount() {
    return cardview_index.length;
  }
  function cardview_getPage() {
    return cardview_page;
  }
  function cardview_checkPage() {
    cardview_setPage(cardview_page);
  }
  function cardview_setPage(newValue) {
    newValue = Math.max(1, Math.min(newValue, cardview_getPageCount()));
    if (cardview_getPageCount() === 0)
      newValue = 0;
    const $view = $(".cardview-current-page");
    if (newValue.toString() !== $view.html())
      $view.html(newValue.toString());
    if (newValue !== cardview_page) {
      cardview_page = newValue;
      cardview_refreshPage();
    }
  }
  function cardview_Init() {
    $(".cardview-labels-add-list").hide();
    $(".cardview-title").on("input", function() {
      const $input = $(this);
      const card = cardview_getCurrentCard();
      const value = cleanContent($input.html());
      undoRedo_editProperty(card, "title", value, function() {
        if ($input.html() !== card.title)
          $input.html(card.title);
      }, true);
    });
    $(".cardview-details").on("input", function() {
      const $input = $(this);
      const card = cardview_getCurrentCard();
      const value = cleanContent($input.html());
      undoRedo_editProperty(card, "content", value, function() {
        if ($input.html() !== card.content)
          $input.html(card.content);
      }, true);
    });
    $(".cardview-show-answer").on("click", cardviewAnswer_toggle);
    $(".cardview-hide-answer").on("click", cardviewAnswer_toggle);
    $(".cardview-answer-text").on("input", function() {
      const $input = $(this);
      const card = cardview_getCurrentCard();
      const value = cleanContent($input.html());
      undoRedo_editProperty(card, "answerContent", value, function() {
        if ($input.html() !== card.answerContent)
          $input.html(card.answerContent);
      }, true);
    });
    $(".cardview-nav-left").on("click", cardview_previousPage);
    $(".cardview-nav-right").on("click", cardview_nextPage);
    $(".cardview-current-page").on("input", function() {
      const userInput = $(this).html();
      const userPage = parseInt(userInput) || 1;
      let page = Math.max(1, Math.min(userPage, cardview_getPageCount()));
      cardview_setPage(page);
      if (page.toString() !== userInput)
        moveCursorToEnd();
      cardview_refreshPage();
    });
    $(".cardview-config-toggle").on("click", cardview_toggleConfig);
    $(".cardview-delete").on("click", function() {
      const cardID = cardview_getCurrentCardID();
      if (cardID)
        undoRedo_deleteCard(cardID);
    });
    $(".cardview-edit").on("click", cardview_toggleEditing);
    cardviewOptions_init();
    cardviewCompletion_init();
    cardviewDifficulty_init();
    cardviewLabels_init();
    cardview_initShortcuts();
    cardview_setCardIDs([]);
  }
  function cardview_initShortcuts() {
    function register(key, action) {
      keyboard_addShortcut({
        "key": key,
        "action": action
      });
    }
    register(["ArrowLeft", "a"], cardview_previousPage);
    register(["ArrowRight", "d"], cardview_nextPage);
    register(" ", cardviewAnswer_toggle);
    register("q", cardview_toggleConfig);
    register("e", cardview_toggleEditing);
    for (let i = 1; i < 10; i++)
      register(i.toString(), () => {
        if (cardviewAnswer_isVisible()) {
          if (i < 6)
            cardviewDifficulty_setValue(i);
          else {
            let value;
            if (i === 6)
              value = "untried";
            else if (i === 7)
              value = "incorrect";
            else
              value = "correct";
            cardviewCompletion_setValue(value);
          }
        } else {
          cardviewOptions_selectNumber(i);
          cardviewOptions_showAnswer();
        }
      });
  }
  function cardview_nextPage() {
    let page = cardview_getPage();
    page++;
    if (page > cardview_getPageCount())
      page = 1;
    cardviewLabels_hideAddList();
    if (!cardview_isEditing())
      cardviewAnswer_hide();
    cardview_setPage(page);
  }
  function cardview_previousPage() {
    let page = cardview_getPage();
    page--;
    if (page < 1)
      page = cardview_getPageCount();
    cardviewLabels_hideAddList();
    if (!cardview_isEditing())
      cardviewAnswer_hide();
    cardview_setPage(page);
  }
  function cardview_refreshPage() {
    const $titleView = $(".cardview-title");
    const $contentView = $(".cardview-details");
    const $imgView = $(".cardview-image");
    const $answerView = $(".cardview-answer-text");
    const $emptyMsgs = $(".cardview-empty-message, .cardview-config-empty-message");
    const card = cardview_getCurrentCard();
    if (!card) {
      $emptyMsgs.show();
      $titleView.hide();
      $contentView.hide();
      $imgView.hide();
      $answerView.hide();
    } else {
      $emptyMsgs.hide();
      const title = card.title || "";
      $titleView.html(title);
      hideIfEmpty($titleView);
      const content = card.content || "";
      $contentView.html(content);
      hideIfEmpty($contentView);
      const imgName = card.img_name;
      if (imgName) {
        const imgSrc = "data/images/" + imgName;
        $imgView.attr("src", imgSrc);
        $imgView.show("fast");
      } else {
        $imgView.hide("fast");
      }
      const answerContent = card.answerContent || "(No content)";
      $answerView.html(answerContent);
      hideIfEmpty($answerView);
    }
    cardviewOptions_refresh();
    cardviewCompletion_refresh();
    cardviewDifficulty_refresh();
    cardviewLabels_refresh();
  }
  function cardview_toggleEditing() {
    if (cardview_isEditing())
      cardview_stopEditing();
    else if (cardview_getCurrentCard())
      cardview_startEditing();
  }
  function cardview_isEditing() {
    return cardview_editing;
  }
  function cardview_startEditing() {
    cardview_editing = true;
    $(".cardview-edit").css("background-color", "#eee");
    $(".cardview-title").prop("contenteditable", true);
    $(".cardview-details").prop("contenteditable", true);
    cardviewOptions_startEditing();
    $(".cardview-show-answer").hide("fast");
    $(".cardview-hide-answer").hide("fast");
    $(".cardview-answer").show("fast");
    $(".cardview-answer-text").prop("contenteditable", true);
    cardview_refreshPage();
  }
  function cardview_stopEditing() {
    cardview_editing = false;
    $(".cardview-edit").css("background-color", "#00000000");
    $(".cardview-title").prop("contenteditable", false);
    $(".cardview-details").prop("contenteditable", false);
    cardviewOptions_stopEditing();
    $(".cardview-show-answer").show("fast");
    $(".cardview-hide-answer").show("fast");
    $(".cardview-answer").hide("fast");
    $(".cardview-answer-text").prop("contenteditable", false);
    cardview_refreshPage();
  }
  function cardview_toggleConfig() {
    $(".cardview-config").toggle("fast");
  }
  var cardviewAnswer_visible = false;
  function cardviewAnswer_toggle() {
    if (cardviewAnswer_isVisible())
      cardviewAnswer_hide();
    else
      cardviewAnswer_show();
  }
  function cardviewAnswer_isVisible() {
    return cardviewAnswer_visible;
  }
  function cardviewAnswer_show() {
    cardviewAnswer_visible = true;
    $(".cardview-show-answer").hide("fast");
    $(".cardview-answer").show("fast");
    cardviewOptions_showAnswer();
  }
  function cardviewAnswer_hide() {
    cardviewAnswer_visible = false;
    cardviewOptions_hideAnswer();
    $(".cardview-answer").hide("fast");
    $(".cardview-show-answer").show("fast");
  }
  function cardviewOptions_init() {
    const optionsView = $(".cardview-options");
    const listView = $(".cardview-options-list");
    listView.on("click", ".cardview-option", function() {
      if (!cardview_isEditing())
        cardviewOptions_select(this);
    });
    listView.on("mouseenter", ".cardview-option-correctness img", function() {
      $(this).attr("src", "images/red-dot-light.svg");
    });
    listView.on("mouseleave", ".cardview-option-correctness img", function() {
      $(this).attr("src", "images/red-dot.svg");
    });
    listView.on("click", ".cardview-option-correctness", function() {
      const $option = $(this).parent(".cardview-option");
      const index = parseInt($option.attr("data-index"));
      const card = cardview_getCurrentCard();
      undoRedo_editProperty(card, "correct", index + 1, cardviewOptions_refresh);
    });
    listView.on("input", ".cardview-option-content", function() {
      const $content = $(this);
      const $option = $content.parent(".cardview-option");
      const content = cleanContent($content.html());
      const index = parseInt($option.attr("data-index"));
      const options = cardview_getCurrentCard().options;
      options[index] = content;
      undoRedo_editProperty(options, index, content, cardviewOptions_refresh, true);
    });
    listView.on("click", ".cardview-option-delete", function() {
      const $option = $(this).parent(".cardview-option");
      const index = parseInt($option.attr("data-index"));
      const card = cardview_getCurrentCard();
      undoRedo_deleteListItem(card.options, index, cardviewOptions_refresh);
    });
    optionsView.on("click", ".cardview-options-new", function() {
      const card = cardview_getCurrentCard();
      const value = "Option #" + (card.options.length + 1);
      undoRedo_pushListItem(card.options, value, cardviewOptions_refresh);
    });
  }
  function cardviewOptions_refresh(speed = "fast") {
    const card = cardview_getCurrentCard();
    if (card)
      $(".cardview-options").show();
    else {
      $(".cardview-options").hide();
      return;
    }
    const options = card.options || [];
    const correct = card.correct || 0;
    const $listView = $(".cardview-options-list");
    const current_n = $listView.children().length;
    const target_n = options.length;
    if (current_n < target_n) {
      for (let i = current_n; i < options.length; i++) {
        const $li = $(`
            <li class="cardview-option" data-index="${i}">
                <button class="cardview-option-correctness">
                    <img alt="incorrect" src="images/red-dot.svg">
                </button>
                <span class="cardview-option-number">${i + 1})</span>
                <span class="cardview-option-content" data-placeholder="(Option Content)"></span>
                <button class="cardview-option-delete">
                    <img alt="delete" src="images/delete.svg">
                </button>
            </li>
        `);
        $listView.append($li);
        $li.hide();
        $li.show(speed);
      }
    } else if (current_n > target_n) {
      for (let i = 0; i < current_n - target_n; i++) {
        const $toRemove = $listView.children().last();
        $toRemove.hide(speed, function() {
          $toRemove.remove();
        });
      }
    }
    $listView.children().each(function(i) {
      const $li = $(this);
      const $content = $li.find(".cardview-option-content");
      if ($content.html() !== options[i])
        $content.html(options[i]);
      const $correctnessImg = $li.find(".cardview-option-correctness");
      if (correct === i + 1) {
        $li.addClass("cardview-correct-secret");
        $correctnessImg.removeClass("icon-incorrect");
        $correctnessImg.addClass("icon-correct");
      } else {
        $li.removeClass("cardview-correct-secret");
        $correctnessImg.removeClass("icon-correct");
        $correctnessImg.addClass("icon-incorrect");
      }
      if (cardview_isEditing()) {
        $li.find(".cardview-option-content").attr("contenteditable", "true");
        $li.find(".cardview-option-correctness").show(speed);
        $li.find(".cardview-option-delete").show(speed);
      } else {
        $li.find(".cardview-option-content").attr("contenteditable", "false");
        $li.find(".cardview-option-correctness").hide(speed);
        $li.find(".cardview-option-delete").hide(speed);
      }
    });
    hideIfEmpty($listView);
  }
  function cardviewOptions_select(element) {
    $(".cardview-selected").removeClass("cardview-selected");
    $(element).addClass("cardview-selected");
  }
  function cardviewOptions_selectNumber(number) {
    var _a;
    const options = (_a = document.querySelector(".cardview-options-list")) == null ? void 0 : _a.children;
    if (!options || options.length === 0)
      return;
    number = Math.max(1, Math.min(number, options.length));
    cardviewOptions_select(options[number - 1]);
  }
  function cardviewOptions_showAnswer() {
    const $correct = $(".cardview-correct-secret");
    const $selected = $(".cardview-selected");
    const card = cardview_getCurrentCard();
    if ($correct.is($selected))
      card.completion = "correct";
    else
      card.completion = "incorrect";
    cardviewCompletion_refresh();
    $(".cardview-correct").removeClass("cardview-correct");
    $(".cardview-incorrect").removeClass("cardview-incorrect");
    $correct.addClass("cardview-correct");
    $selected.addClass("cardview-incorrect");
    $selected.removeClass("cardview-selected");
  }
  function cardviewOptions_hideAnswer() {
    $(".cardview-incorrect").removeClass("cardview-incorrect");
    $(".cardview-correct-secret").removeClass("cardview-correct");
  }
  function cardviewOptions_startEditing() {
    cardviewOptions_hideAnswer();
    $(".cardview-selected").removeClass("cardview-selected");
    $(".cardview-options-new").show("fast");
    cardviewOptions_refresh();
  }
  function cardviewOptions_stopEditing() {
    $(".cardview-options-new").hide("fast");
    cardviewOptions_refresh();
  }
  function cardviewCompletion_init() {
    const $listView = $(".cardview-completion");
    $listView.on("mouseenter", "img", function() {
      $(this).attr("src", "images/red-dot-light-interior.svg");
    });
    $listView.on("mouseleave", "img", function() {
      const element = $(this);
      if (element.parent("button").attr("data-value") === cardviewCompletion_getValue())
        element.attr("src", "images/red-dot.svg");
      else
        element.attr("src", "images/red-dot-empty.svg");
    });
    $listView.on("click", "button", function() {
      const value = $(this).attr("data-value");
      cardviewCompletion_setValue(value);
    });
  }
  function cardviewCompletion_refresh() {
    const $view = $(".cardview-completion");
    if (!cardview_getCurrentCard()) {
      $view.hide();
      return;
    }
    $view.show().find("img").each((i, element) => {
      const $element = $(element);
      if ($element.parent("button").attr("data-value") === cardviewCompletion_getValue())
        $element.attr("src", "images/red-dot.svg");
      else
        $element.attr("src", "images/red-dot-empty.svg");
    });
  }
  function cardviewCompletion_setValue(value) {
    const card = cardview_getCurrentCard();
    undoRedo_editProperty(card, "completion", value, cardviewCompletion_refresh);
  }
  function cardviewCompletion_getValue() {
    return cardview_getCurrentCard().completion || "untried";
  }
  function cardviewDifficulty_init() {
    const $listView = $(".cardview-difficulty-list");
    $listView.on("mouseenter", "img", function() {
      $(this).attr("src", "images/star-filled-light.svg");
    });
    $listView.on("mouseleave", "img", function() {
      const $img = $(this);
      if ($img.parent("button").attr("data-n") <= cardviewDifficulty_getValue())
        $img.attr("src", "images/star-filled.svg");
      else
        $img.attr("src", "images/star-empty.svg");
    });
    $listView.on("click", "button", function() {
      const value = $(this).attr("data-n");
      cardviewDifficulty_setValue(value);
    });
  }
  function cardviewDifficulty_refresh() {
    const $view = $(".cardview-difficulty");
    if (!cardview_getCurrentCard()) {
      $view.hide();
      return;
    } else
      $view.show();
    $(".cardview-difficulty-list").find("img").each((i, element) => {
      const $element = $(element);
      if ($element.parent("button").attr("data-n") <= cardviewDifficulty_getValue())
        $element.attr("src", "images/star-filled.svg");
      else
        $element.attr("src", "images/star-empty.svg");
    });
  }
  function cardviewDifficulty_setValue(number) {
    number = Math.max(1, Math.min(number, 5));
    const card = cardview_getCurrentCard();
    undoRedo_editProperty(card, "difficulty", number, cardviewDifficulty_refresh);
  }
  function cardviewDifficulty_getValue() {
    return cardview_getCurrentCard().difficulty || 1;
  }
  function cardviewLabels_init() {
    cardviewLabels_refreshAddList();
    const labelsView = $(".cardview-labels");
    labelsView.on("input", "input[type=text]", function() {
      const input = $(this);
      const label = cardviewLabels_getLabel(input.parents("li"));
      undoRedo_editProperty(label, "name", input.val(), cardviewLabels_updateText, true);
    });
    labelsView.on("input", ".cardview-label-bg", function() {
      const $input = $(this);
      const target = cardviewLabels_getLabel($input.parents("li"));
      undoRedo_editProperty(target, "color", $input.val(), cardviewLabels_updateColors);
    });
    labelsView.on("input", ".cardview-label-color", function() {
      const $input = $(this);
      const target = cardviewLabels_getLabel($input.parents("li"));
      undoRedo_editProperty(target, "textColor", $input.val(), cardviewLabels_updateColors);
    });
    labelsView.on("mouseenter", "li", function() {
      $(this).find(".cardview-label-buttons").show("fast");
    });
    labelsView.on("mouseleave", "li", function() {
      $(this).find(".cardview-label-buttons").hide("fast");
    });
    labelsView.on("click", ".cardview-label-remove", function() {
      const labelID = cardviewLabels_getLabelID($(this).parents("li"));
      const labels = cardview_getCurrentCard().labels;
      const index = labels.indexOf(labelID);
      if (index > -1)
        undoRedo_deleteListItem(labels, index, cardviewLabels_refresh);
    });
    labelsView.on("click", ".cardview-label-delete", function(e) {
      const $li = $(this).parents("li");
      const label = cardviewLabels_getLabel($li);
      undoRedo_deleteLabel(label.id, function() {
        cardviewLabels_refresh();
        cardviewLabels_refreshAddList();
      });
      e.stopPropagation();
    });
    labelsView.on("click", ".cardview-label-edit", function(event) {
      const li = $(this).parents("li");
      cardviewLabels_toggleEditing(li);
      event.stopPropagation();
    });
    labelsView.on("mouseenter", "img", function() {
      const img = $(this);
      const li = img.parents("li");
      const color = li.css("background-color");
      const lightColor = mapColor(color, (r, g, b) => {
        const amount = (255 - Math.min(r, g, b)) / 3;
        return [r + amount, g + amount, b + amount];
      });
      img.css("background-color", lightColor);
    });
    labelsView.on("mouseleave", "img", function() {
      $(this).css("background-color", "#00000000");
    });
    labelsView.on("focusout", "li", function() {
      if (!this.matches(":focus-within"))
        cardviewLabels_stopEditing($(this));
    });
    labelsView.on("click", ".cardview-labels-add", function() {
      cardviewLabels_toggleAddList();
    });
    labelsView.on("focusout", ".cardview-labels-add-list", function() {
      if (!this.matches(":focus-within"))
        cardviewLabels_hideAddList();
    });
    labelsView.on("click", ".cardview-labels-add-list li", function() {
      const $li = $(this);
      if (!cardviewLabels_isEditing($li)) {
        cardviewLabels_hideAddList();
        const card = cardview_getCurrentCard();
        const labelID = cardviewLabels_getLabelID($li);
        undoRedo_pushListItem(card.labels, labelID, cardviewLabels_refresh);
      }
    });
    labelsView.on("click", ".cardview-labels-new", function() {
      undoRedo_createNewLabel(function() {
        cardviewLabels_refreshAddList();
        const $latest = $(".cardview-labels-add-list").find("li:last-child");
        cardviewLabels_startEditing($latest);
      });
    });
  }
  function cardviewLabels_updateText() {
    $(".cardview-label").each(function(index, li) {
      const $li = $(li);
      const label = cardviewLabels_getLabel($li);
      $li.find("input[type=text]").val(label.name);
    });
  }
  function cardviewLabels_updateColors() {
    $(".cardview-label").each(function(index, li) {
      const $li = $(li);
      const label = cardviewLabels_getLabel($li);
      const color = label.color || "#bab0b0";
      const textColor = label.textColor || "#ffffff";
      $li.css({
        "color": textColor,
        "background-color": color
      });
      $li.find(".cardview-label-bg").val(color);
      $li.find(".cardview-label-color").val(textColor);
    });
  }
  function cardviewLabels_toggleEditing(labelLi) {
    if (!cardviewLabels_isEditing(labelLi))
      cardviewLabels_startEditing(labelLi);
    else
      cardviewLabels_stopEditing(labelLi);
  }
  function cardviewLabels_isEditing(labelLi) {
    return !labelLi.find(".cardview-label-text").prop("disabled");
  }
  function cardviewLabels_startEditing(labelLi) {
    labelLi.find(".cardview-label-colors").show("fast");
    const text = labelLi.find(".cardview-label-text");
    text.prop("disabled", false);
    text.trigger("select");
    labelLi[0].scrollIntoView();
  }
  function cardviewLabels_stopEditing(labelLi) {
    labelLi.find(".cardview-label-colors").hide("fast");
    const text = labelLi.find(".cardview-label-text");
    text.prop("disabled", true);
  }
  function cardviewLabels_refresh() {
    const card = cardview_getCurrentCard();
    const $view = $(".cardview-labels");
    if (card)
      $view.show();
    else {
      $view.hide();
      return;
    }
    const cardLabels = card.labels || [];
    const $listView = $(".cardview-labels-list");
    $listView.html("");
    for (let labelID of cardLabels) {
      const label = cards_getLabel(labelID);
      if (typeof label === "undefined") {
        console.log("Unable to read card label: " + labelID);
        continue;
      }
      $listView.append(cardviewLabels_createElement(label, "cardview-label-remove"));
    }
  }
  function cardviewLabels_refreshAddList() {
    const $listView = $(".cardview-labels-add-list").find("ol");
    $listView.html("");
    for (let label of cards_getLabels()) {
      $listView.append(cardviewLabels_createElement(label, "cardview-label-delete"));
    }
  }
  function cardviewLabels_getLabelID(labelElement) {
    const $labelElement = $(labelElement);
    return parseInt($labelElement.attr("data-value"));
  }
  function cardviewLabels_getLabel(labelElement) {
    return cards_getLabel(cardviewLabels_getLabelID(labelElement));
  }
  function cardviewLabels_createElement(label, removalClass) {
    const labelID = label.id;
    const labelText = label.name || "(no name)";
    const labelBgColor = label.color || "#bab0b0";
    const labelTextColor = label.textColor || "#ffffff";
    const $li = $(`
            <li class="cardview-label" data-value="${labelID}">
                <div class="cardview-label-row1">
                    <input class="cardview-label-text" type="text" value="${labelText}">
                    <span class="cardview-label-buttons">
                        <button class="cardview-label-edit"><img alt="edit" src="images/draw.svg"></button>
                        <button class="${removalClass}"><img alt="remove" src="images/delete.svg"></button>
                    </span>
                </div>
                <div class="cardview-label-row2 cardview-label-colors">
                    <input class="cardview-label-bg" type="color" value="${labelBgColor}">
                    <input class="cardview-label-color" type="color" value="${labelTextColor}">
                </div>
            </li>`);
    $li.css({
      "color": labelTextColor,
      "background-color": labelBgColor
    });
    $li.find(".cardview-label-text").prop("disabled", true);
    $li.find(".cardview-label-colors").hide();
    $li.find(".cardview-label-buttons").hide();
    return $li;
  }
  function cardviewLabels_toggleAddList(speed = "fast") {
    $(".cardview-labels-add-list").toggle(speed);
  }
  function cardviewLabels_hideAddList(speed = "fast") {
    $(".cardview-labels-add-list").hide(speed);
  }

  // src/scripts/index.ts
  $(function() {
    console.log("Starting... " + new Date().toLocaleTimeString());
    cards_init();
    keyboard_init();
    undoRedo_init();
    $(".included-content").load("card-view.html", function() {
      cardview_Init();
      cardview_setCardIDs([...cards_getIDs()]);
      cardview_setPage(150);
    });
  });
})();
