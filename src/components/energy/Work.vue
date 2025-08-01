<script setup>
import { reactive, watch } from 'vue'
const props = defineProps(["level", "page", "lessonShowing"])
defineEmits(["nextlesson", "nextpage", "prevpage"])

const results = reactive([0]) // update as add more questions
const explanations = reactive([false]) // keeps track of what explanations are visible
const questions = reactive(
    [
        [ // conceptual difficutly
            {
                number: 0,
                question: "What is the proper format for a vector in component form?",
                answers: [
                    ["$\\{3, 5\\}$", 0],
                    ["$\\langle 3, 5 \\rangle$", 1],
                    ["$(3, 5)$", 0],
                    ["$[3, 5]$", 0]
                ],
                explain: "Recall that a vector in component form is denoted by its component in the horizontal direction ($x$) and vertical direction ($y$), surrounded by angle brackets. Thus the second answer choice is the correct one."
            }
        ],
        [ // algebra difficutly
            {
                number: 0,
                question: "What is the proper format for a vector in component form?",
                answers: [
                    ["$\\{3, 5\\}$", 0],
                    ["$\\langle 3, 5 \\rangle$", 1],
                    ["$(3, 5)$", 0],
                    ["$[3, 5]$", 0]
                ],
                explain: "Recall that a vector in component form is denoted by its component in the horizontal direction ($x$) and vertical direction ($y$), surrounded by angle brackets. Thus the second answer choice is the correct one."
            }
        ],
        [ // calculus difficutly
            {
                number: 0,
                question: "What is the proper format for a vector in component form?",
                answers: [
                    ["$\\{3, 5\\}$", 0],
                    ["$\\langle 3, 5 \\rangle$", 1],
                    ["$(3, 5)$", 0],
                    ["$[3, 5]$", 0]
                ],
                explain: "Recall that a vector in component form is denoted by its component in the horizontal direction ($x$) and vertical direction ($y$), surrounded by angle brackets. Thus the second answer choice is the correct one."
            }
        ]
    ]
)

// universal check answer for a given question
function checkAnswer(form) {
    const data = new FormData(document.querySelectorAll(".question")[form])
    if (data.get("question") === "y") results[form] = 1
    else results[form] = -1
}

// remove progress on lesson change
watch(() => props.lessonShowing, () => {
    for (let i = 0; i < results.length; i++) {
        results[i] = 0
        if (props.lessonShowing == true) document.querySelectorAll(".question")[i].reset()
    }

})
</script>


<template>
    <div v-show="lessonShowing" class="container h100 p-5">
        <h1>Definition of "Work"</h1><br>
        <p>
        <div v-show="page === 0">
            We've all done work before, whether it be for school, money, or just for fun. But in physics, the idea of
            work is slightly different from what we think it is in daily life. (In fact, me typing these all words out
            on a
            keyboard might sound like a lot of work, but the actual amount of (physics) work done is very little!) This
            lesson is designed to teach you all about work and what it means to do work in a physics context. And no,
            doing
            problems actually isn't that much "work". I'll stop with the jokes now and get into the content.
            <br><br>
            <span v-show="level > 0">
                Work is defined as the dot product of force and displacement. Therefore, it has the unit of $N\cdot m$,
                more commonly called joules ($J$). These are both vector quantities, but work itself is a
                scalar quantity. However, it's still important to realize that while work doesn't have a range of
                directions, it can still
                be either positive or negative. Thus, work can "cancel out" in a way, much like vectors can, but it is
                unltimately always going
                to be a scalar quantity. Here's a mathematical description of what I just said:
                <br><br>
                $$W = \vec{F} \cdot \vec{x}$$
                <br><br>
                <span v-show="level == 2">
                    Now, this formula is only true if the force is constant. If we have a varying force (which we often
                    do in
                    more complex, more realistic scenarios) we need to write this as a differential equation:
                    <br><br>
                    $$dW = \vec{F} \cdot d\vec{x}$$
                    <br><br>
                    This will come in handy, trust me.
                    <br><br>
                </span>
                <figure>
                    <img src="/src/assets/energy/Figure 50.png" style="max-width:750px" />
                    <figcaption>Figure 1: Work in daily life versus work in physics. </figcaption>
                </figure>
                <br><br>
                This formula tells us a lot of things, but most of those I've already mentioned or are pretty obvious.
                However, it is
                important to note that work can either be calculated for a single force or a net force. You can have
                work done by any particular
                force even if it is not the net force, but the net work done (by the net force, evidently) is usually
                more important when
                it comes to analysis.
                <br><br>
                Do you understand now why I said typing on your keyboard does very little work? When you press on the
                keys,
                you cause them to displace downwards a very small amount, meaning the displacement vector and therefore
                the work
                done is very small. (You also don't press down on the keys very hard, so the force is small too.)
                <br><br>
            </span>
            <span v-show="level == 0">
                The definition of work takes into account the dot product from earlier. In particular, it is the dot
                product of
                force and displacement (which are both vectors, but work is a scalar!). The quantity of work has the new
                unit of joules ($J$), which is
                equivalent to a newton-meter. This is a pretty simple definition, and it
                leads to a pretty simple formula:
                <br><br>
                $$W = \vec{F} \cdot \vec{x}$$
                <br><br>
                <figure>
                    <img src="/src/assets/energy/Figure 50.png" style="max-width:750px" />
                    <figcaption>Figure 1: Work in daily life versus work in physics. </figcaption>
                </figure>
                Basically, the work is both dependent on the displacement of an object as well as the force exerted on
                it. This formula
                calculates the work done by a single force. Let's try an example, hearkening back to the beginning of
                this lesson, where I stated
                that the work done by typing on a keyboard is very little. (You should be able to understand why - the
                force you press on the keyboard
                is small, as is the displacement of the keys!)
            </span>
            <div class="problem">
                What work is done by pressing on a keyboard key? Assume the key compresses down a distance of $x = 1.5
                ~\textrm{mm}$ and the force you exert on it
                is $F = 0.5 ~\textrm{N}$ directly downwards?
                <br><br>
                <figure>
                    <img src="/src/assets/energy/sheldoncomputer.png" />
                    <figcaption>Figure 2: An accurate representation of the scenario. </figcaption>
                </figure>
                <br><br>
                This is a pretty simple calculation. Now we do have to consider that these two are vectors and the dot
                product is required, but since
                both vectors point straight downwards the angle between them is zero and thus you just multiply their
                magnitudes. A common mistake is to forget
                to convert millimeters to meters.
                <br><br>
                $$W = \vec{F} \cdot \vec{x} = 0.0015(0.5) = \bbox[3px,
                border: 0.5px solid
                white]{7.5 \times 10^{-4} ~\textrm{J}}$$
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
        </div>
        <div v-show="page === 1">
            Technically, we have already covered the definition of work in detail. However, there is a lot of nuance
            to this, and there are other things that we need to cover in order to have a complete understanding of work.
            The first
            is how to find the work done on an object given a graph of force vs. displacement, almost always for an
            object moving in
            one dimension. (Calculus students, you might
            already know how to do this just from that!)
            <br><br>
            The key is that the work done is the area under the force vs. displacement graph!
            <span v-show="level < 2">
                The exact explanation requires calculus, but a more basic explanation is to look at the axes. You have
                force and displacement as your axes, and since there's only
                one dimension involved you can simply multiply them. Multiplying them gives you the area under the
                graph! This isn't really
                a full definition, but it's as good as I can get without going into calculus details.
            </span>
            <span v-show="level == 2">
                You might remeber the previous work formula as a differential equation. Well, we can simply integrate
                this to find
                the work, which explains why the work done is the area under the curve for a force vs. displacement
                graph. This
                explanation is simple and elegant, but it requires knowledge of calculus. In fact, since you're calculus
                students, you
                can easily apply this principle to graphs that have irregular areas; that is, areas that can't be
                calculated with
                geometric formulas.
            </span>
            <br><br>
            This might seem like a random addition to this section, and for the sake of real physics you'd probably be
            right. However, a large number of problems have force vs. displacement graphs and require
            you to find the work done by that varying force. The graphs are mostly geometric in shape and the area under
            the curve
            can be calculated exactly with geometry knowledge. I'll show one as a very basic example, just to make sure
            we're clear on the concept.
            <br><br>
            <div class="problem">
                What is the work done on the object by the force shown in the diagram below as it moves from $x=0$ to
                $x=6 ~\textrm{m}$?
                <br><br>
                <figure>
                    <img src="/src/assets/energy/Figure 51.png">
                </figure>
                This is quite simple. You find the area under the graph from $x=0$ to $x=6$, which is just simple
                geometry. However,
                there are two common errors that I've seen with this kind of graph. The first is to assume that the area
                is measured to the
                bottom of the graph. However, area under a curve refers to the area between that curve and the x-axis,
                not the bottom of the
                graph. You'll notice that the x-axis is not at the very bottom of the graph, so be careful here! The
                next is a more elementary mistake.
                Area that is below the x-axis is counted as negative in calculations. Some people may neglect this,
                which leads to incorrect
                answers. But that's enough yapping, I'll get to the solution.
                <br><br>
                Using basic geometry, we can analyze the graph. Remembering that area below the x-axis is negative, we
                can come
                to the conclusion that:
                <br><br>
                $$W = \textrm{Area under the graph} = 6 + (-2) = \bbox[3px,
                border: 0.5px solid
                white]{4 ~\textrm{J}}$$
            </div>
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
            I've talked about the force part behind the work formula, so it's now time to talk about the displacement
            part.
            Actually, we're not talking about directly, but rather talking about conservative and nonconservative
            forces. These
            are the two types of forces in general when it comes to work.
            <br><br>
            <span v-show="level > 0">
                The key is to focus on the different possible paths that an object can take to go from one point to
                another, and
                whether the choice of those paths affects the work done. There are technically an infinite number of
                paths from one
                point to another, but here I'll illustrate three just to show you the possible variety.
                <br><br>
                <figure>
                    <img src="/src/assets/energy/Figure 52.png">
                    <figcaption>Figure 3: A work of modern art, or a representation of three different possible paths
                        between two points? It's the latter.</figcaption>
                </figure>
                <br><br>
                The <b>conservative</b> force is one that is path-independent. What that means is that the work it does
                only depends on its displacement, not the exact path it traveled on. It doesn't matter if you took any
                number of fancy
                turns or maneuvers during on your path. The work done by this force on you will be the same as someone
                who travelled in a
                straight line between the start and end points. Good examples of this are spring forces and
                gravitational forces.
                <br><br>
                This naturally leads to the idea of a <b>nonconservative</b> force. This kind of force is
                path-dependent, meaning the work done
                by it will vary on the path you took, even if the start and end points don't change. The most common of
                these nonconservative
                forces is friction. Now, let's take a moment to think about why friction is nonconservative.
                <br><br>
                One of friction's key features is that it always
                opposes the direction of relative motion, which means that it'll be oppositely directed to the object
                along its entire path.
                <span v-show="level == 2">
                    Thinking back to the differential formula for work, we realize that it's oppositely directed to the
                    tangent to the path
                    everywhere. This means that even though the vector differential $d\vec{x}$ is constantly changing
                    over the path, the dot product is still
                    the same because the direction of friction changes with this. Thus, we arrive at a formula for work
                    done by friction:
                </span>
                <span v-show="level == 1">
                    The exact reasoning here requires calculus, but just know that it has something to do with having to
                    compute the dot product constantly because
                    the direction of friction changes constantly. Since the direction of friction is always oppositely
                    directed to the momentary change in position, we can
                    write a formula for the work done by friction:
                </span>
                <br><br>
                $$ W_{friction} = - F_f d \cos \theta $$
                <br><br>
                The letter $d$ here represents <b>distance</b>, not displacement. The cosine is there because the
                frictional force and the
                momentary displacement vector might not be exactly opposite to each other at any given moment (but they
                usually are). I'd say don't
                worry about it too much, since it doesn't show up often or even at all, since I can't think of a
                meaningful scenario where the
                cosine is actually in use.
                <br><br>
                Of course, this
                formula is really only applicable for kinetic friction because static friction causes no relative
                motion. While static friction
                can do work (it does work in our old penguin and sled example), most of the time we're concerned with
                dissipative effects due to friction, and
                static friction does not dissipate energy.
                <br><br>
                Speaking of energy, work and energy are actually inextricably tied. But, this is a lesson on work, so
                you'll
                have to go to the next lesson to learn about energy. So, if you're ready, hit that <del>subscribe
                    button</del> next lesson
                button on the bottom right!
            </span>
            <span v-show="level == 0">
                The two classifications of forces depend on the idea of path independence, which is when something
                doesn't care
                about the path it took, just the start and end points. This might sound familiar, and you'd be right!
                The idea of
                displacement is path-independent, since it only considers start and end points.
                <br><br>
                <figure>
                    <img src="/src/assets/energy/Figure 52.png">
                    <figcaption>Figure 3: A work of modern art, or a representation of three different possible paths
                        between two points? It's the latter.</figcaption>
                </figure>
                <br><br>
                The first type of force is a <b>conservative</b> force, which does the same amount of work regardless of
                the path taken. It doesn't matter if you took any number of fancy
                turns or maneuvers during on your path. This includes most field forces like gravity, as well as a few
                others. It's the easier of the two
                to deal with, since you don't have to worry about complications caused by taking a complicated path.
                (See what I did there?)
                <br><br>
                The other type of force is a <b>nonconservative</b> force that does different
                amounts of work depending on the path taken. These are usually forces like friction and air resistance.
                Now for these forces, while it is possible to calculate the work
                done by them, if the path is complex you either need scary calculus or just simply can't solve the
                problem exactly. If you want the formula for friction, you
                can look at it in our Algebra-based and Caclulus-based levels, but no worries if you don't feel
                confident. We won't be seeing these too much, so rest assured.
                <br><br>
                These two concepts conclude our discussion of work, but they lead perfectly into our discussion of
                energy in the next lesson. So if you're ready, just hit that
                button over there and let's move on!
            </span>
            <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('prevpage')">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale 2s infinite;" @click="$emit('nextlesson')">Next
                    Lesson!
                    &rarr;</button>
            </div>
        </div>
        </p>
    </div>

    <div v-show="!lessonShowing" class="container h100 p-5">
        <h1>Work Problems</h1><br>
        <form @submit.prevent="checkAnswer(q.number)" class="question row justify-content-center mx-auto mt-5"
            v-for="q in questions[level]">
            <div class="w-100">
                <label class="form-label fs-5">{{ q.number + 1 + ". " + q.question }}</label><br>
            </div>
            <div class="col border-end border-secondary">
                <div class="ms-auto" style="width:fit-content">
                    <div class="form-check" style="width:fit-content;" v-for="a in q.answers">
                        <input class="form-check-input" type="radio" name="question" :value="a[1] === 0 ? 'n' : 'y'">
                        <label class="form-check-label" style="font-size:0.96rem">
                            {{ a[0] }}
                        </label>
                    </div>
                </div>
            </div>
            <div class="col d-flex flex-column">
                <input class="btn btn-primary d-block me-auto my-auto" type="submit"
                    :value="results[q.number] !== 0 ? 'Check Again' : 'Check Answer'"><br>
                <div class="me-auto my-auto" v-show="results[q.number] !== 0">{{ results[q.number]
                    === 1 ?
                    "&#x2705; Correct!" : "&#x274c; Not quite! Try again." }}
                </div>
                <a href="#" v-show="results[q.number] !== 0" class="me-auto mb-auto ms-1"
                    @click="explanations[q.number] = !explanations[q.number]">{{ !explanations[q.number] ? "Want to see an explanation ? " : "Hide explanation" }}</a>
            </div>
            <span class="mt-3" style="padding: 0% 25%" v-show="explanations[q.number]">{{ q.explain }}</span>
        </form>

    </div>
</template>


<style scoped></style>