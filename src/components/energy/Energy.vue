<script setup>
import{ref} from 'vue'
defineProps(["level", "page"])
defineEmits(["nextlesson", "nextpage", "prevpage"])
const show = ref(false)
const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)
</script>


<template>
    <div class="container h100 p-5">
        <h1>Definition of Energy and Energy Conservation</h1><br>
        <p>
            <div v-show="page===0">
                Here's a question for the ages: what is energy? We use the term all the time in our
                daily lives, yet if I asked you to give a concrete definition of what energy was I doubt you would 
                be able to do it. It's obviously something that exists, but is hard to define concisely and isn't tangible.
                 Therefore, I'll
                leave you to seek your own idea of energy.
                <br><br>
                In physics, energy is a scalar quantity that has the unit of joules. (This is the same as work for a reason, as we'll
                see later!) This does <b>not</b> indicate that energy is never negative, though we rarely think of it that way. Yes, for the
                vasy majority of cases energy will be positive, but there are some important cases where energy is more easily thought of as a 
                negative quantity.
                <br><br>
                There are many different types of energy. The first important type is kinetic energy, which is the energy that moving objects have.
                It is defined quite simply as:
                <br><br>
                $$K = \dfrac12 mv^2$$
                <br>
                <span v-show="level>0">
                    Now, recall that the velocity of any object is frame-dependent. This means that for different observers in 
                    different reference frames, the kinetic energy of an object will vary. In other words, the kinetic energy is a 
                    <b>frame-dependent quantity</b>. This kind of leads into the idea that energy is relative, but the nuances of this 
                    result aren't important at our level.
                    <br><br>
                </span>
                The formula makes a lot of sense. An object that moves faster evidently has more energy, and more massive objects also 
                intutively have more energy than smaller ones. It is important to note that this energy scales with the <b>square</b> of the 
                speed of an object, which explains why vehicle collisions become much more deadly as speeds get higher.
                <br><br>
                With this, we can present the <b>work-energy theorem</b>:
                <br><br>
                <figure>
                    The work done on an object is equivalent to its change in kinetic energy.
                    <br>
                    $$W = \Delta K$$
                </figure>
                <br>
                <span v-show="level>0">
                    With that, let's see how this new theorem compares to using our previously-used force-analysis 
                    methods.
                    <br><br>
                    <div class="problem">
                        A box of mass $m = 4.0~\textrm{kg}$is pushed from rest horizontally with a force $F = 50 ~\textrm{N}$ on a horizontal, frictionless surface 
                        over a distance of 10 meters. What is its velocity at the end of the ten meters? Use both the method of 
                        forces and the work-energy theorem.
                        <br><br>
                        For our method of force analysis, we can recognize that forces are balanced vertically, while $F$ is the only 
                        force acting in the x-direction. This tells us that it must cause some acceleration.
                        <br><br>
                        $$F = ma$$
                        $$a = \dfrac{F}{m} = 12.5 ~\textrm{m/s}^2$$
                        <br>
                        This simplifies the problem down into a kinematics one, and we can one of our key kinematics formulas to derive 
                        the velocity at the end of 10 meters. Since the initial velocity is zero, we can drop one of the terms.
                        <br><br>
                        $$ v^2 = 2ax$$
                        $$v = \bbox[3px,
                    border: 0.5px solid
                    white]{15.8 ~\textrm{m/s}}$$
                        <br>
                        Now, we want to do the same problem using the newfound technique of the work-energy theorem. The work in 
                        this case is equal to the force times the displacement since they are parallel.
                        <br><br>
                        $$W = F \cdot x = 500 \textrm{J}$$ 
                        <br>
                        This is equal to $\Delta K$, so we can write:
                        <br><br>
                        $$ W = \dfrac12 mv^2$$
                        $$ v = \sqrt{\dfrac{2W}{m}} = \bbox[3px,
                    border: 0.5px solid
                    white]{15.8 ~\textrm{m/s}}$$
                    <br>
                    Both methods yield the same answer, as they should. What nice and well-behaved formulas.
                    </div>
                    <br><br>
                </span>
                Currently, this is actually a flawed and incomplete view of work and energy. Like I said, there are a multitude of 
                different types of energy, most of which are important to a complete understanding of the topic. We need to introduce more types 
                of energy to widen the picture.
                <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
                </div>
            </div>
            <div v-show="page===1">
            The next type of energy that is important is <b>potential energy</b>.  Like the name suggests, it is energy that has 
            the potential to turn into another type of energy, usually kinetic. It arises due to the configuration of the system. I know 
            that wording sounds vague and weird, but it'll make sense soon. Generally, it is referred to as $U$.
            <br><br>
            It is also crucial to note that the idea of potential energy is tied to the idea of a conservative force. In fact, 
            only forces that are conservative can result in energy being stored in this form, as nonconservtive forces dissipate energy 
            into a form like heat that is not completely recoverable. (Second Law of Thermodynamics!) Thus, you'll notice that all the 
            potential energies we talk about are tied to some conservative force.
            <br><br>
            There are actually many subcategories of potential energy, each denoted with a subscript. The first is <b>gravitational potential energy</b>, which arises from 
            positioning of an object relative to the Earth. Essentially, the higher up an object is, the more gravitational potential 
            energy it will have. However, since there is not a clearly defined "zero potential energy" point (you might be tempted to think the ground 
            has zero potential energy, but terrain exists!), we can actually define any
            point we want to have zero gravitational potential energy. We usually just pick the most convenient point.
            <br><br>
            <figure>
                <img src="/src/assets/energy/Figure 53.png" width="750px" />
                <figcaption>Figure 1: Purple Guy has more gravitational potential energy than the red guy lying down.</figcaption>
            </figure>
            <br><br>
            The exact formula for gravitational potential energy is:
            <br><br>
            $$U_g = mgh$$
            <br>
            Again, $h$ is measured vertically from a zero potential energy point of your choosing. <span v-show="level>0">
                Selecting this point is a good test of your problem-solving techniques. If you select the proper 
                point, you can end up saving yourself a lot of work and simplify the problem significantly. Most of the 
                time where to put this is obvious, but for problems that involve pulleys it is not immediately obvious.
            </span>
            It is also possible for this energy to be negative, if your position is below that of the defined zero.
            <br><br>
            <span v-show="level==0">
                With that, let's test your conceptual understanding of the concept of gravitational potential energy.
                <br><br>
                <div class="problem">
                    For each of the scenarios described below, what is the change in potential energy of the object: positive, negative, or 
                    zero?
                    <br><br>
                    A box is raised via a rope elevator from the first floor to the seventh floor of a building.
                    <span>
                    
                    <div v-show="show" class = 'answer' style="width:fit-content">
                        <strong>Answer:</strong> The change in gravitational potential energy is positive, since the object's height from the Earth increases.
                        <br>
                    </div>
                    <button class="btn btn-outline-primary" @click="show = !show">{{ show ? 'Hide' : 'Show' }} Answer
                    </button>
                </span>
                    <br><br>
                    An athlete lifts a barbell once. (That means they lifted it up and put it back down.)
                <span>
                    
                    <div v-show="show1" class = 'answer' style="width:fit-content">
                        <strong>Answer:</strong> The change in gravitational potential energy is zero, since the barbell ends up at the same height it started at.
                        <br>
                    </div>
                    <button class="btn btn-outline-primary" @click="show1 = !show1">{{ show1 ? 'Hide' : 'Show' }} Answer
                    </button>
                </span>
                <br><br>
                    A rock is thrown off of a cliff into a lake.
                    <span>
                    
                    <div v-show="show2" class = 'answer' style="width:fit-content">
                        <strong>Answer:</strong> The change in gravitational potential energy is negative, since the object goes from a higher point to a lower one.
                        <br>
                    </div>
                    <button class="btn btn-outline-primary" @click="show2 = !show2">{{ show2 ? 'Hide' : 'Show' }} Answer
                    </button>
                </span>
                </div>
                <br><br>
                Congratulations, you've understood gravitational potential energy! Now, I'll make a very cursory introduction of the other 
                type of potential energy that's commonly seen, <b>spring potential energy.</b> As the name suggests, it is the potential energy 
                stored in a spring, and is defined by:
                <br><br>
                $$U_s = \dfrac12 kx^2$$
                <br>
                With that, now we can talk about the second part of the title of this unit: the conservation of energy. This will let 
                us solve many problems that force analysis cannot tackle.
            </span>
            <span v-show="level>0">
                It's more common to deal with the change in gravitational potential energy $\Delta U_g$. 
                <br><br>
                The other type of potential energy I should mention for this unit is the <b>spring potential energy</b>, the potential 
                energy stored in a compressed or stretched Hookean spring. This is described by the equation:
                <br><br>
                $$U_s = \dfrac 12 kx^2$$
                <br>
                The more the spring is stretched or compressed, the more energy it stores. Note that the energy is 
                positive regardless of whether you stretch or compress it because of that quadratic. This is a pretty simple and intuitive result.
                <span v-show="level==2">
                <br><br>
                I did say that we would mostly deal with Hookean springs which would follow the spring potential energy formula shown above, but there 
                is actually a generalized formula that can relate force to potential energy. It involves a derivative:
                <br><br>
                $$ F = - \dfrac{dU}{dx} $$
                <br>
                This tells us that the force can be determined as the negative of the derivative of potential energy with respect to position. 
                Try this for a Hookean spring, and you'll see that Hooke's law and our previous expression for the spring potential energy do indeed 
                follow this formula.
                <br><br>
                <div class="problem">
                    What is the spring potential energy of a non-Hookean spring that follows the relation shown below?
                    <br>
                    $$ F_s = - k_q x^2 $$
                    <br>
                    We need to apply the formula given above on this equation. We are given the force and asked for potential 
                    energy, so we must put the relation into the form of a differential equation:
                    <br><br>
                    $$ dU = - F dx $$
                    <br>
                    Doing some simple integration gives us:
                    <br><br>
                    $$\bbox[3px,
                    border: 0.5px solid
                    white]{U = \dfrac13 k_q x^3}$$
                </div>
                </span>
                <br><br>
                It is now time for a few conceptual questions to test your understanding of potential energy. We will incorporate 
                both the gravitational and spring potential energies into this little quiz.
                <br><br>
                <div class="problem">
                    For each of the scenarios described below, what is the change in potential energy of the object: positive, negative, or 
                    zero?
                    <br><br>
                    A box is raised via a rope elevator from the first floor to the seventh floor of a building.
                    <span>
                    
                    <div v-show="show" class = 'answer' style="width:fit-content">
                        <strong>Answer:</strong> The change in gravitational potential energy is positive, since the object's height from the Earth increases.
                        <br>
                    </div>
                    <button class="btn btn-outline-primary" @click="show = !show">{{ show ? 'Hide' : 'Show' }} Answer
                    </button>
                </span>
                    <br><br>
                    An athlete lifts a barbell once. (That means they lifted it up and put it back down.)
                <span>
                    
                    <div v-show="show1" class = 'answer' style="width:fit-content">
                        <strong>Answer:</strong> The change in gravitational potential energy is zero, since the barbell ends up at the same height it started at.
                        <br>
                    </div>
                    <button class="btn btn-outline-primary" @click="show1 = !show1">{{ show1 ? 'Hide' : 'Show' }} Answer
                    </button>
                </span>
                <br><br>
                    A rock is thrown off of a cliff into a lake.
                    <span>
                    
                    <div v-show="show2" class = 'answer' style="width:fit-content">
                        <strong>Answer:</strong> The change in gravitational potential energy is negative, since the object goes from a higher point to a lower one.
                        <br>
                    </div>
                    <button class="btn btn-outline-primary" @click="show2 = !show2">{{ show2 ? 'Hide' : 'Show' }} Answer
                    </button>
                </span>
                <br><br>
                    A person sits on a spring-loaded mattress.
                <span>
                    
                    <div v-show="show3" class = 'answer' style="width:fit-content">
                        <strong>Answer:</strong> The change in spring potential energy is positive, since the springs in the mattress get compressed from equilibrium.
                        <br>
                    </div>
                    <button class="btn btn-outline-primary" @click="show3 = !show3">{{ show3 ? 'Hide' : 'Show' }} Answer
                    </button>
                </span>
                <br><br>
                You pull hard on a spring until it snaps.
                <span>
                    
                    <div v-show="show4" class = 'answer' style="width:fit-content">
                        <strong>Answer:</strong> The change in spring potential energy is zero. A broken spring will snap back to its relaxed state, which stores no potential energy. Moreover, if you pulled hard 
                        enough on the spring to deform it, it would no longer be able to store any energy.
                        <br>
                    </div>
                    <button class="btn btn-outline-primary" @click="show4 = !show4">{{ show4 ? 'Hide' : 'Show' }} Answer
                    </button>
                </span>
                </div>
                <br><br>
                With that, we've completed our discussion of potential energy for the time being. Now, it's time to unite the two 
                kinds of energy we've learned about and talk about the conservation of energy, which is, after all, the second part of this lesson's 
                title. This technique will let us solve many problems that force analysis could not.
            </span>
                <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('prevpage')">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
            </div>
            <div v-show="page===2">
                We are often asked to conserve energy. But, according to the law of conservation of energy, energy is always 
                conserved.
                <br><br>
                <div class="problem"style="text-align:center;font-size:1.05rem;width:fit-content;margin:auto;">
                    <b>The Law of Conservation of Energy:</b> 
                    <br><i>The total amount of energy in the universe is constant. Energy 
                        can change forms, but can never be created or destroyed.
                    </i>
                </div>
                <br>
                How does one conserve energy then? Well, the statememnt is often used not to reference conserving all kinds of energy, but 
                rather to prevent energy from being dissipated. Due to the Second Law of Thermodynamics, this isn't actually possible, but we can 
                be more efficient with our energy consumption. Energy that is dissipated as heat, sound, or light cannot easily be 
                recovered.
                <br><br>
                Under the specific conditions that <b>there are no dissipative forces in the system</b> and <b>no net external force acts on the system</b>, 
                we can turn the generalized form of the conservation of energy into the <b>conservation of mechanical energy</b>.
                <div class="problem"style="text-align:center;font-size:1.05rem;width:fit-content;margin:auto;">
                    <b>The Law of Conservation of Mechanical Energy:</b> 
                    <br><i>If no nonconservative forces and no net external force act within a system, total mechanical energy will 
                        be conserved in all interactions.
                    </i>
                </div>
                <br>
                Mechanical energy is simply the combination of potential and kinetic energy. <span v-show="level==0">Now, this can be a difficult result to 
                apply due to how abstract the concept of energy is, but having a concrete handle on the concepts of potential and kinetic 
                energy can help significantly. Perhaps a diagram would not be out of place here.
                <br><br>
                    <figure>
                        <img src="/src/assets/energy/Figure 54.png" width="500px" />
                        <figcaption>Figure 2: A diagram with bars to show conservation of mechanical energy.</figcaption>
                    </figure>
                <br>
                The deep blue bar represents the total amount of potential energy at each point where we analyze the system, while the 
                purple bar represents the total kinetic energy of the system at those points. As you can see, the sum of the two stays 
                constant. We can think of this as potential energy turning into kinetic energy as time progresses (but never being lost!).
                <br><br>
                For this particular scenario of a ball rolling down the ramp, we will assume the ball starts at rest at the 
                top of the ramp. Initially, all of the energy in the system is potential because the ball has zero velocity. If we define 
                the point of zero potential energy to be at the bottom of the ramp, then we end with zero potential energy. Thus, all of the initial 
                potential energy is converted to kinetic energy through the process of the ball moving down the ramp.
                <br><br>
                You might have noticed that the ramp is not uniformly inclined; in other words, it's a curved ramp. This means that we can't use 
                the result for an inclined plane we talked about earlier! However, the energy approach has no such weaknesses; we only care about 
                the start and end positions' heights. This is a consequence of the conservative forces we talked about earlier!
            </span>
            <span v-show="level>0">
                At each point throughout an object's motion, it has both potential and kinetic energy (either of which can be zero). However, the sum of the 
                two energies at any given point is equal to the total mechanical energy, denoted $E_{mech}$ or just simply $E$. There is a popular method 
                of visually displaying the amount of energy for an object, involving the use of different-length bars to denote the magnitude of 
                energy at any point. 
                <br><br>
                <figure>
                        <img src="/src/assets/energy/Figure 54.png" width="500px" />
                        <figcaption>Figure 2: A diagram with bars to show conservation of mechanical energy.</figcaption>
                    </figure>
                <br>
                This diagram illustrates what I was talking about. The deep blue bars represent potential energy of the object at each position, while 
                the purple bars represent kinetic energy. The sum of the two energies at any point is constant, which illustrates the idea 
                of conservation of energy. 
                <br><br>
                The specific scenario involves a ball rolling from rest down a ramp. You might be thinking to yourself how I determined the potential energy, since I said earlier it was relative. (If you 
                weren't thinking this, pay close attention now!) Well, I defined the point of zero potential energy at the most convenient location: the bottom 
                of the ramp. The ball will never go below the ramp, so it's a good spot and allows the potential energy term to go to zero when the ball reaches that position.
                <br><br>
                Now, a good way to think about what happens is to think of potential energy being 
                converted to kinetic energy. As the ball rolls down the ramp, the gravitational force causes the ball to accelerate while also 
                causing it to fall to a lower height; this is essentially trading potential energy into kinetic energy. Since we defined our zero 
                at the bottom of the ramp, in this case all of the kinetic energy turns into potential energy.
                <br><br>
                Do you notice anything special about the ramp? That's right. In all of our previous examples, we've dealt with an inclined plane, which
                is flat and has a constant incline angle $\theta$. This one, however, is curved. We cannot easily deal with a curved 
                surface using force-analysis techniques because the direction of the normal force and the acceleration change constantly. However, energy 
                conservation solves this issue, allowing us to just consider the final and initial heights because gravitational potential energy only cares
                about the change in height. Conservative forces at it again!
                <br><br>
                We can actually deal with dissipative forces like friction. See, friction is relatively simple to deal with because 
                it has a formula it invariably follows. The work done by friction always tends to take mechanical energy away from the system in the 
                form of heat and sound, so we know that this work is equal to the change in mechanical energy. We call this lost energy 
                $\Delta E_{mech}$.
                <br><br>
                Frictional forces only dissipate energy if they are kinetic, and kinetic friction doesn't vary like static friction does. This 
                simplifies the formula significantly, allowing us to write:
                <br><br>
                $$\Delta E_{mech} = -F_f d \cos \theta $$
                <br>
                You might notice that this is the same formula we introduced in the work lesson! Indeed, the work done by friction 
                is just equal to the energy loss. This value is negative in the formula, and the idea behind this is that 
                work done by friction always tends to decrease the total mechanical energy of a system. Now, we should be ready to 
                do some practice problems.
            </span>
                <div class="btn-contain-left">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('prevpage')">&larr;
                    Previous</button>
            </div>
            <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
            </div>
            <div v-show="page===3">
                <div class="problem">
                    <span v-show="level>0">
                        Consider the roller coaster shown below. The car (mass $m = 65 ~\textrm{kg}$) starts with zero velocity and is gently pushed off the starting 
                        platform, which is $H = 6.0 ~\textrm{m}$ above point B. Points B and E are at the same height, while point C is located $h = 3.5 ~\textrm{m}$ above them. The spring is located 
                        immediately after point E and has a spring constant $k = 1200 ~\textrm{N/m}$. All surafces are frictionless, and air resistance can be neglected.
                    </span>
                    <span v-show="level==0">
                        Consider the roller coaster shown below. I'm going to throw a lot of information at you, so be ready! The car starts with zero velocity and is gently pushed off the starting 
                        platform. Points B and E are at the same height. The spring is located 
                        immediately after point E and has a spring constant. There is no friction or air resistance.
                    </span>
                    <br><br>
                    <figure>
                        <img src="/src/assets/energy/The Yoinkity Sploinkity.png" width="1000px" />
                        <figcaption>Figure 3: Our newest roller coaster, The Yoinkity Sploinkity.</figcaption>
                    </figure>
                    <br>
                    <span v-show="level>0">
                        This problem is going to have a lot of parts, so be ready. The first thing I will ask for is the velocity of the cart at point
                        B, C, and E. Point D is kind of a special case that we'll get to next. Use the technique of the conservation of mechanical energy!
                        <br><br>
                        Ready? The car at point A has zero kinetic energy and some amount of potential energy. Since the lowest the car ever goes is to 
                        point B a height $H$ below the starting position, we can say points B and E have zero potential energy. This lets us solve for the velocity 
                        at point B $v_b$ now:
                        <br><br>
                        $$ U_i + K_i = U_f + K_f $$
                        $$ mgH = \dfrac12 m{v_b}^2 $$
                        $$ v_b = \sqrt{2gH} = \bbox[3px,
                    border: 0.5px solid
                    white]{10.8 ~\textrm{m/s}} $$
                    <br><br>
                    You might have noticed that the first line looks a bit new. It's really just a more practical way to write the conservation 
                    of mechanical energy, however: we have terms representing initial and final potential and kinetic energies.
                    <br><br>
                    Next, we can do the same approach for point C, which is $h$ above point B. We compare this with the initial state at point A again. We can do this 
                    because energy is conserved throughout the entire motion of the car!
                    <br><br>
                    $$ mgH = \dfrac12 m{v_c}^2 + mgh $$
                    $$ v_c = \sqrt{2g (H-h)} = \bbox[3px,
                    border: 0.5px solid
                    white]{7.00 ~\textrm{m/s}}$$
                    <br>
                    We could move on to do the same calculations for point E, but we can recognize something that will save us this work. See, points B and 
                    E are at the same height, and potential energy only depends on the height and not the path of an object. This means that the 
                    potential energy at point E is zero just like in point B, allowing us to conclude that the velocity at point E $v_e$ must 
                    be equal to $v_b$. 
                    <br><br>
                    $$ v_e = v_b = \bbox[3px,
                    border: 0.5px solid
                    white]{10.8 ~\textrm{m/s}} $$
                    <br>
                    First part of the question down! Next, we're going to deal with the circular loop-de-loop at point D. Let's find the 
                    maximum possible radius of the loop $R$ such that the car doesn't fall out of the loop.
                    <br><br>
                    Since the car is going in a circle, it's not as simple as just using conservation of energy. We need to
                    consider that the car is undergoing circular motion, which means that it must have some centripetal acceleration.
                    The two forces that could supply this at the top of the loop are the normal force and gravitational force. The normal 
                    force can vary, but gravity is constant. 
                    <br><br>
                    You want to recall from our centripetal force/acceleration lesson that at the critical velocity where the 
                    car is just barely able to stay in the loop, the normal force is zero. This means that the gravitational force must be
                    the only force providing the centripetal acceleration. This means that we can write:
                    <br><br>
                    $$ mg = \dfrac{m{v_d}^2}{R} $$
                    <br>
                    This yields the result (which should look somewhat familiar!):
                    <br><br>
                    $$ R = \dfrac{ {v_d}^2}{g} $$
                    <br>
                    We should also write this in another form:
                    <br><br>
                    $$ v_d = \sqrt{gR} $$
                    <br>
                    Now, we need to find the velocity at point D $v_d$. We can use the previously shown method that 
                    we used for points B, C, and E, being conservation of mechanical energy. Point D is at the top of the loop, 
                    which is a height $2R$ above "ground level" (zero potential energy). Thus, we can write:
                    <br><br>
                    $$ mgH = \dfrac12 m{v_d}^2 + mg(2R) $$
                    <br>
                    We next want to substitute the expression we found for $R$ into this equation, which gives us:
                    <br><br>
                    $$ mgH = \dfrac12 m (gR) + 2mgR) $$
                    <br>
                    $$ H = \dfrac{5}{2} R $$
                    <br>
                    $$ R = \dfrac{2H}{5} = \bbox[3px,
                    border: 0.5px solid
                    white]{2.4 ~\textrm{m}} $$
                    <br>
                    We just found the maximum radius of the loop! If the radius is any larger, the car will not be able to stay in the loop.
                    And we would get a lot of lawsuits if that happened.
                    <br><br>
                    That spring at point E looks like it could use some attention. This leads into the last part of 
                    our very lengthy problem. We want to find the maximum compression of the spring $x$ when the car hits it.

                    </span>
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
            
        </p>
    </div>

</template>


<style scoped>

</style>