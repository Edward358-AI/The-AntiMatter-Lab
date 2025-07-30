<script setup>
defineProps(["level", "page", "lessonShowing"])
defineEmits(["nextlesson", "nextpage", "prevpage"])
</script>


<template>
    <div class="container h100 p-5">
        <h1>Newton's Laws</h1><br>
        <div v-show="page === 0">
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
                <img src="/src/assets/dynamics/Figure 13.png" />
                <figcaption>Figure 1: A force vector acting on a box.</figcaption>
            </figure>
            <br>
            Thus, we begin the lesson by introducing Newton's Laws. Let's go to it!
            </p>

            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page === 1">
            <p>
                Newton’s first law has to do with the idea of motion.
            </p><br>
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
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('prevpage')">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page === 2">
            <p>
                Newton’s second law relates the acceleration of an object to the forces acting on it. This is the only
                one of Newton’s laws to have an explicit mathematical equation associated with it:
            </p><br>
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
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('prevpage')">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page === 3">
            <p>
                Newton’s third law states that all forces must exist in pairs.
            </p><br>
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
                <img src="/src/assets/dynamics/Figure 14.png" />
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
                ground. The magnitude of the gravitational force that Earth exerts on you just happens to be of the same
                magnitude, but they are of different interactions.
                <br><br>The Newton’s Third Law equivalent for the force the
                ground exerts on you is the force you exert on the ground. Furthermore, you could have also reasoned
                that
                the two forces both act on the same object (you, the person), so they cannot be part of an
                action-reaction
                pair. An action-reaction force pair <b>always</b> acts on two different objects.
                <br><br>
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
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('prevpage')">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale 2s infinite;" @click="$emit('nextlesson')">Next
                    Lesson! &rarr;</button>
            </div>
        </div>
    </div>

</template>


<style scoped></style>