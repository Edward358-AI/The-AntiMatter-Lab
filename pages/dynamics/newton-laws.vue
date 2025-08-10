
<script setup>
useHead({
    title: 'Newton\'s Laws',
    meta: [
        { name: 'description', content: 'Explore Newton\'s Laws of Motion and their significance in understanding forces.' }
    ]
})

import { reactive, watch } from 'vue'
import { useUserStore } from '../../stores/user'
import { useLessonShowingStore } from '../../stores/lessonShowing'
import { storeToRefs } from 'pinia'

const lessonShowing = storeToRefs(useLessonShowingStore()).lessonShowing
const level = storeToRefs(useUserStore()).difficulty
const page = storeToRefs(useUserStore()).Newton

watch(page, () => window.scrollTo(0,0))
watch(level, () => {if (!lessonShowing.value) nextTick(() => window.MathJax?.typeset())})

const results = reactive([[0,0,0,0,0,0], [0,0,0,0,0,0], [0,0,0,0,0,0]]) // update as add more questions
const explanations = reactive([[false,false,false,false,false,false], [false,false,false,false,false,false], [false,false,false,false,false,false]]) // keeps track of what explanations are visible
const questions = reactive(
    [
        [ // conceptual difficutly
            {
                number: 0,
                question: "What causes a net force?",
                answers: [
                    ["An acceleration", 0, false],
                    ["Physical contact with an object", 0, false],
                    ["Forces aren't real", 0, false],
                    ["Net forces are not \"caused\"", 1, false]
                ],
                explain: "Recall that the net force produces an acceleration, not the other way around. The other answer choices are all inaccurate to some degree. You don't need contact to have a force, as gravity evidences, and forces are obviously real."
            },
            {
                number: 1,
                question: "Which of these is an example of Newton's First Law in action?",
                answers: [
                    ["A person running on a circular track", 0, false],
                    ["A person flying through a windshield after a crash", 1, false],
                    ["A pendulum bob rocking back and forth", 0, false],
                    ["An object free falling under gravity", 0, false]
                ],
                explain: "The second answer choice is grim, but it demonstrates the idea of inertia: that the person retains their original velocity after the car is suddenly stopped. All of the others do not demonstrate this concept."
            },
            {
                number: 2,
                question: "What is the gravitational force from the Earth on you compared to the force from you on the Earth?",
                answers: [
                    ["The Earth exerts a greater force on you", 0, false],
                    ["The forces are the same in magnitude", 1, false],
                    ["You exert no force on the Earth", 0, false],
                    ["You exert a greater force on the Earth", 0, false]
                ],
                explain: "According to Newton's Third Law, forces come in equal and opposite action-reaction pairs. Even gravity does this, which means that the correct answer choice is the second one."
            },
            {
                number: 3,
                question: "Why does an object on a tabletop not accelerate?",
                answers: [
                    ["Because the forces on it are balanced", 1, false],
                    ["Because there are no forces on it", 0, false],
                    ["It is held in place by gravity", 0, false],
                    ["Because of Newton's First Law", 0, false]
                ],
                explain: "Recall that if forces are balanced, it means the net force on the object is exactly zero. This is why the object does not accelerate. All of the other answer choices are either incorrect or provide an incomplete explanation."
            },
            {
                number: 4,
                question: "Why is it easier for spaceships to achieve high speeds?",
                answers: [
                    ["They have very powerful engines", 0, false],
                    ["They can fly", 0, false],
                    ["There is almost zero friction in space", 1, false],
                    ["There is no gravity in space", 0, false]
                ],
                explain: "While some of these statements may be true, the one that explains why spacecraft practically don't slow down at all in space is the third answer choice. This allows them to run relatively weak but long-lasting engines, which accelerate them slowly up to enormously high speeds."
            },
            {
                number: 5,
                question: "How is motion possible at all if all forces occur in equal and opposite force pairs according to Newton's Third Law?",
                answers: [
                    ["All motion is an illusion", 0, false],
                    ["The larger object experiences less force", 0, false],
                    ["The forces aren't actually balanced", 0, false],
                    ["The forces act on different objects", 1, false]
                ],
                explain: "The force pair acts on two different objects, so the two forces don't cancel each other out. This is important to know!"
            }
        ],
        [ // algebra difficutly
            {
                number: 0,
                question: "What causes a net force?",
                answers: [
                    ["An acceleration", 0, false],
                    ["Physical contact with an object", 0, false],
                    ["Forces aren't real", 0, false],
                    ["Net forces are not \"caused\"", 1, false]
                ],
                explain: "Recall that the net force produces an acceleration, not the other way around. The other answer choices are all inaccurate to some degree. You don't need contact to have a force, as gravity evidences, and forces are obviously real."
            },
            {
                number: 1,
                question: "A box of mass 3.0 kg is pushed by an unknown force across a surface, where it accelerates at $2.3 \\textrm{m/s}^2$. What must be the net force on the box?",
                answers: [
                    ["1.30 N", 0, false],
                    ["6.90 N", 1, false],
                    ["0.76 N", 0, false],
                    ["5.30 N", 0, false]
                ],
                explain: "Recall that Newton's Second Law states that the net force must be equal to the mass times the acceleration. Thus, we can calculate that the net force on the object from the information given is 6.90 N."
            },
            {
                number: 2,
                question: "How are Newton's First and Second Laws related?",
                answers: [
                    ["They are in increasing numerical order", 0, false],
                    ["They both have to do with balanced forces", 0, false],
                    ["The first law is a special case of the second", 1, false],
                    ["The first law is used to understand the second", 0, false]
                ],
                explain: "Newton's First Law is a special case of the second law where the net force is zero ($F_{net} = 0$), and therefore the acceleration is zero."
            },
            {
                number: 3,
                question: "Can an action-reaction force pair ever act on the same object?",
                answers: [
                    ["Yes", 0, false],
                    ["No", 1, false],
                    ["Sometimes", 0, false],
                    ["Always", 0, false]
                ],
                explain: "By definition, an action-reaction force pair acts on <i>two different objects</i>. They can never be on the same object."
            },
            {
                number: 4,
                question: "Suppose we have an object in outer space, far away from any planets or stars. You find that exerting a force of 30 N on it causes it to accelerate at 3.7 m/s. What is the object's mass?",
                answers: [
                    ["8.11 kg", 1, false],
                    ["111 kg", 0, false],
                    ["26.3 kg", 0, false],
                    ["0.12 kg", 0, false]
                ],
                explain: "Recall that Newton's Second Law states that $F_{net} = ma$. Since we are far away from everything, the only force on the object is the 30 N you push on it with. This is your net force, and you can simply use the second law to solve for mass with this information."
            },
            {
                number: 5,
                question: "How is motion possible at all if all forces occur in equal and opposite force pairs according to Newton's Third Law?",
                answers: [
                    ["All motion is an illusion", 0, false],
                    ["The larger object experiences less force", 0, false],
                    ["The forces aren't actually balanced", 0, false],
                    ["The forces act on different objects", 1, false]
                ],
                explain: "The force pair acts on two different objects, so the two forces don't cancel each other out. This is important to know!"
            }
        ],
        [ // calculus difficutly
            {
                number: 0,
                question: "What causes a net force?",
                answers: [
                    ["An acceleration", 0, false],
                    ["Physical contact with an object", 0, false],
                    ["Forces aren't real", 0, false],
                    ["Net forces are not \"caused\"", 1, false]
                ],
                explain: "Recall that the net force produces an acceleration, not the other way around. The other answer choices are all inaccurate to some degree. You don't need contact to have a force, as gravity evidences, and forces are obviously real."
            },
            {
                number: 1,
                question: "A box of mass 3.0 kg is pushed by an unknown force across a surface, where it accelerates at $2.3 \\textrm{m/s}^2$. What must be the net force on the box?",
                answers: [
                    ["1.30 N", 0, false],
                    ["6.90 N", 1, false],
                    ["0.76 N", 0, false],
                    ["5.30 N", 0, false]
                ],
                explain: "Recall that Newton's Second Law states that the net force must be equal to the mass times the acceleration. Thus, we can calculate that the net force on the object from the information given is 6.90 N."
            },
            {
                number: 2,
                question: "How are Newton's First and Second Laws related?",
                answers: [
                    ["They are in increasing numerical order", 0, false],
                    ["They both have to do with balanced forces", 0, false],
                    ["The first law is a special case of the second", 1, false],
                    ["The first law is used to understand the second", 0, false]
                ],
                explain: "Newton's First Law is a special case of the second law where the net force is zero ($F_{net} = 0$), and therefore the acceleration is zero."
            },
            {
                number: 3,
                question: "Can an action-reaction force pair ever act on the same object?",
                answers: [
                    ["Yes", 0, false],
                    ["No", 1, false],
                    ["Sometimes", 0, false],
                    ["Always", 0, false]
                ],
                explain: "By definition, an action-reaction force pair acts on <i>two different objects</i>. They can never be on the same object."
            },
            {
                number: 4,
                question: "Suppose we have an object in outer space, far away from any planets or stars. You find that exerting a force of 30 N on it causes it to accelerate at 3.7 m/s. What is the object's mass?",
                answers: [
                    ["8.11 kg", 1, false],
                    ["111 kg", 0, false],
                    ["26.3 kg", 0, false],
                    ["0.12 kg", 0, false]
                ],
                explain: "Recall that Newton's Second Law states that $F_{net} = ma$. Since we are far away from everything, the only force on the object is the 30 N you push on it with. This is your net force, and you can simply use the second law to solve for mass with this information."
            },
            {
                number: 5,
                question: "How is motion possible at all if all forces occur in equal and opposite force pairs according to Newton's Third Law?",
                answers: [
                    ["All motion is an illusion", 0, false],
                    ["The larger object experiences less force", 0, false],
                    ["The forces aren't actually balanced", 0, false],
                    ["The forces act on different objects", 1, false]
                ],
                explain: "The force pair acts on two different objects, so the two forces don't cancel each other out. This is important to know!"
            }
        ]
    ]
)

// universal check answer for a given question
function checkAnswer(form) {
    const data = new FormData(document.querySelectorAll(".question")[form])
    if (data.get("question") === "y") results[level.value][form] = 1
    else results[level.value][form] = -1
}

function setChecked(chek, qNum) {
    for (let i = 0; i < questions[level.value][qNum].answers.length; i++) {
        if (questions[level.value][qNum].answers[i][2] && i !== chek) {
            questions[level.value][qNum].answers[i][2] = false
        } else if (!questions[level.value][qNum].answers[i][2] && i === chek) {
            questions[level.value][qNum].answers[i][2] = true
        }
    }
}
</script>


<template>
    <div v-show="lessonShowing" class="container h100 p-5">
        <h1>Newton's Laws</h1><br>
        <div v-show="page === 0"><h4 class="text-center">Introduction</h4>
            <p>
                This is the start of probably the most important and difficult unit to master in all of physics. First,
                introductions: Isaac Newton is a name well known in physics and mathematics for his breakthroughs and
                innovations in both fields. In this section, we will begin our study of dynamics starting with his three
                laws of motion. It is good to first define what forces are: a push or pull that may result in motion.
                <br><br>
                However, you will see later that a force may not necessarily directly <i>cause</i> motion, but rather it
                directly <i>changes</i> motion, which is an important concept to recognize. The unit of force is the
                newton, represented by $\textrm N$. This actually a derived unit, with units $\frac{\textrm{kg} \cdot
                \textrm m}{\textrm{s}^2}$. We will show how this is derived later on. Force is a vector quantity,
                meaning it has a direction and magnitude. This will become especially important more later on, when we
                introduce the idea of a free-body diagram.
                <br><br>
            <figure>
                <img src="/dynamics/Figure 13.png" />
                <figcaption>Figure 1: A force vector acting on a box.</figcaption>
            </figure>
            <br>
            Thus, we begin the lesson by introducing Newton's Laws. Let's go to it!
            </p>

            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page++">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page === 1">
            <h4 class="text-center">Newton's First Law</h4><br>
            <div class="problem" style="text-align:center;font-size:1.05rem;width:fit-content;margin:auto;">
                <strong>Newton’s First Law (Law of Inertia):</strong> <i>An object tends to remain in its state of
                    motion.</i>
            </div>
            <p><br>
                Let’s break this down into pieces. "State of motion" refers to whether an object is moving and how it is
                moving. So,
                this law dictates that objects at rest will remain at rest, and objects in motion will remain in motion
                (in a straight line, since changing direction changes the velocity of an object). However, there is one
                small quirk that is not mentioned here. This only holds true when the <i>net</i>, total, or sum of all
                the
                external forces acting on an object is zero.<br><br>Looking at a real world example, the reason we see
                objects slow down as they move across surfaces is due to the frictional
                force. A good way to demonstrate this principle is to use a near-frictionless surface like ice. An
                object set into motion on ice will move in a straight line at basically constant velocity until it hits
                something. This opposes the commonly perceived idea that force is directly responsible for causing
                motion,
                but rather, force changes motion. As seen in the ice example, a continuous force is not required to keep
                an
                object moving. This idea is super important and will come up later on.<br><br>
                The resistance an object offers to being set into motion or being set to rest is its inertia, and it is
                directly proportional to its mass. There is no numerical quantity corresponding to this, but just know
                that more massive objects have greater inertia. Often times, an object's mass is called its <i>inertial
                    mass</i>.
                <br>
                This law is not used in calculations, but it justifies the entirety of force analysis and gives us an
                idea as to what forces do.<br><br>
                All these things that Newton stated are <i>only</i> valid in an inertial reference frame. An inertial
                reference frame is a reference frame, or coordinate system, that which objects obey Newton's First Law.
                That
                means the frame itself is not accelerating, because if it was, the objects would accelerate without
                external
                forces, and since acceleration is defined as change in velocity, its velocity, or motion, is changing,
                and
                that is a violation of Newton's First Law. Furthermore, Newton's First Law does not also hold true for a
                frame that is constantly changing orientation, the more common form being rotating. A change in
                direction
                means acceleration, since acceleration is <i>change</i> in motion (remember the example of going around
                in a
                circle from position, velocity, acceleration). Again, Newton's First Law is invalid for a rotating
                frame, or
                frame that is constantly changing orientation. Thus, Newton's First Law must only be valid for reference
                frames that are still or moving at <i>constant velocity</i>. This is a CRUCIAL concept to understand and
                when selecting reference frames, you ensure that you at least pick a correct one.
            </p>
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page--">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page++">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page === 2">
            <h4 class="text-center">Newton's Second Law</h4><br>
            <div class="problem" style="text-align:center;font-size:1.05rem;width:fit-content;margin:auto;">
                <strong>Newton’s Second Law (Law of Acceleration):</strong> <i>The net force acting on an object is
                    equal to its mass times
                    its acceleration.</i>
            </div>
            <p><br>
                In mathematical terms, $F_{net}=ma$. Note that both $F$ and $a$ are vectors, but $m$ is a scalar, so $F$
                and $a$ have to be in the same direction (since multiplying by a scalar, in this case $m$, is not going
                to change the direction of the vector). $F_{net}$ is sometimes denoted as $\Sigma F$, the vector sum of
                all forces. The funny looking Greek character is the capital letter sigma, which essentially just means
                “sum”, or “net”.<br><br>
                It is important to realize that the net force results in the acceleration and never any other way
                around. Acceleration only comes by way of a net force. In that case, it may be more helpful to write the
                equation as $a=\frac{F_{net}}{m}$, which much more clearly implies the fact that acceleration is caused
                by a net force.
                <br><br>
                Now here's an entry level example of Newton's 2nd Law in action: If an object is moving at constant
                velocity, is there a net external force acting on it (Assume we are in an inertial reference frame
                unless mentioned otherwise)? Immediately, you should recognize that constant velociy means no
                acceleration. Therefore, if $a=0$, then $F_{net}=0$, by Newton's 2nd Law. This is another way to prove
                that force is not needed to maintain motion, nor does it directly cause motion, but rather, it changes
                motion. This will become more prevalent in the circular motion unit.<br><br>
                <span v-show="level == 0">
                    We typically won't do many complex calculations, albeit that we will use this knowledge to do some
                    very basic, entry level problems. We will also be drawing free-body diagrams, because it is a super
                    powerful tool, you will soon come to realize. Newton's Second Law is one of the hardest topics in
                    mechanics to master, but its also one of the most important. You will probably be using this
                    throughout the rest of the course, here and there.
                </span>
                <span v-show="level > 0">
                    This just a preview, though. You will soon see the full power and might of Newton's 2nd Law when we
                    talk about free-body diagrams. Newton's Second Law is actually one of the hardest parts of mechanic
                    to fully master, because some of the problems involving such a simple little equation can get very,
                    very complex and tough to work out. But don't worry too much about it. I believe you will be able to
                    grasp it.
                </span>
            </p>
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page--">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page++">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page === 3">
            <h4 class="text-center">Newton's Third Law</h4><br>
            <div class="problem" style="text-align:center;font-size:1.05rem;width:fit-content;margin:auto;">
                <strong>Newton’s Third Law (Law of Action-Reaction):</strong> <i> Every action force has an opposite and
                    equal reaction force.</i>
            </div>
            <p><br>
                Firstly, I would address the fact that Newton's Third Law is probably the most misunderstood, despite
                being one of the easiest laws to understand conceptually. How on Earth is this possible? Well, first,
                let me tell you what it actually means.<br><br>Essentially, if one object exerts a force on another it
                experiences an equal and oppositely directed force from the other object. It explains things such as
                recoil and makes rocket propulsion possible. Now, this may seem impossible and contradictory to
                experience. If all forces occur in equal pairs, wouldn’t motion be impossible?<br><br>However, there is
                one key thing to note about this law. The force pair does NOT act on the same object, but rather on
                different objects. And, according to the second law, acceleration of an object is proportional to both
                net force and mass. So, the two objects will have different accelerations assuming their masses are
                different, which reconciles this law with our observation and experience.
            </p>
            <br><br>
            <figure>
                <img src="/dynamics/Figure 14.png" />
                <figcaption>Figure 2: A gun being fired, with force vectors indicating Newton's Third Law in action.
                </figcaption>
            </figure>
            <br>
            <p>
                Let’s take a look at why Newton's Third Law is misunderstood sometimes. For example, say I asked you
                this question. What is the
                opposite and reaction force of the gravitational force the Earth exerts on you?<br><br>Maybe you would
                say it is
                the force that the ground exerts on you. However, this is actually incorrect. It is important to mention
                that Newton’s Third Law only applies to pairs of forces that belong to the same interaction.
                The interaction between you and Earth is completely different from the interaction between you and the
                ground. In actuality, the Newton’s Third Law equivalent for the force the
                ground exerts on you is the force you exert on the ground. Furthermore, you could have also reasoned
                that
                the two forces both act on the same object (you, the person), so they cannot be part of an
                action-reaction
                pair. An action-reaction force pair <b>always</b> acts on two different objects.<br><br> Thus, as crazy as it may sound, the Newton's Third Law pair for the gravitational force the Earth exerts on you is the gravitational force you exert on the Earth. (You will see why this is true in the lesson regarding Newton's Law of Gravitation.)</p>
                <br><br><h4 class="text-center">Conclusion</h4>
                <p>
                Surprisingly, Newton’s Third Law is not the most difficult to understand, it’s just that the way it is
                interpreted and presented often times is incorrect. Newton states "action" and "reaction", but in truth,
                there is no action and reaction. From now on, we will call these pairs "Third Law Pairs", because that's
                what they are. Finally, as an ending note, intuitively, you can think of it this way: Newton’s
                Third Law is like if I punch you in the face, I break my wrist, and not if I punch you, you punch me
                back.
                <br><br>
                But all these are just concepts. (Except maybe the Second Law.) Now let's put them to use with free-body
                diagrams!
            </p>
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="page--">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <NuxtLink class="btn btn-dark" style="animation: scale 2s infinite;" @click="page=0" to="/dynamics/other-forces">Next
                    Lesson! &rarr;</NuxtLink>
            </div>
        </div>
    </div>

    <div v-show="!lessonShowing" class="container h100 pt-5">
        <h1>Newton's Laws Problems</h1><br>
        <div class="question-container row justify-content-center mx-auto pb-5">
            <form @submit.prevent="checkAnswer(q.number)" style="height:fit-content"
                class="question col-6 row justify-content-center my-5 mx-auto" v-for="q in questions[level]">
                <div class="w-100">
                    <label class="form-label fs-5" v-html=" q.number + 1 + '. ' + q.question"></label><br>
                </div>
                <div class="col border-end border-secondary">
                    <div class="ms-auto" style="width:fit-content">
                        <div class="form-check" style="width:fit-content;" v-for="(a, index) in q.answers">
                            <input class="form-check-input" type="radio" name="question" :value="a[1] === 0 ? 'n' : 'y'"
                                :checked="a[2]" @click="setChecked(index, q.number)">
                            <label class="form-check-label text-start" style="font-size:0.96rem; max-width: 200px;">
                                {{ a[0] }}
                            </label>
                        </div>
                    </div>
                </div>
                <div class="col d-flex flex-column text-start">
                    <input class="btn btn-primary d-block me-auto my-auto" type="submit"
                        :value="results[level][q.number] !== 0 ? 'Check Again' : 'Check Answer'"><br>
                    <div class="me-auto mb-auto" v-show="results[level][q.number] !== 0">{{ results[level][q.number]
                        === 1 ?
                        "&#x2705; Correct!" : "&#x274c; Not quite! Try again." }}
                    </div>
                    <a href="javascript:void(0)" v-show="results[level][q.number] !== 0" class="me-auto mb-auto ms-1"
                        @click="explanations[level][q.number] = !explanations[level][q.number]">{{
                            !explanations[level][q.number] ? "Want to see an explanation? " : "Hide explanation" }}</a>
                </div>
                <span class="explained mt-3" v-show="explanations[level][q.number]" v-html="q.explain"></span>
            </form>

        </div>
    </div>
</template>


<style scoped></style>