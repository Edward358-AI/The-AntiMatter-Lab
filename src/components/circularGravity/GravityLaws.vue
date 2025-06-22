<script setup>
defineProps(["level", "page"])
defineEmits(["nextlesson", "nextpage", "prevpage"])
</script>


<template>
    <div class="container h100 p-5">
        <h1>Newton's Laws of Gravitation</h1><br>
        <p>
            <div v-show="page===0">
                Issac Newton knew a ton about forces, but he also investigated gravity. Our conception of gravity to this
                point is that it's a constant field with field strength $g = 9.81 ~\textrm{m/s}^2$, but this is only true
                if you're standing on the surface of the Earth. (Technically, this value also varies depending on where you
                are on Earth.) However, if you go a significant distance upwards, the gravitational force will get weaker.
                <br><br>
                The Newton apple story is often cited as an instance of Newton "discovering" gravity, but this couldn't be further from the truth.
                Do you really think people didn't know that objects tended to fall down before then? No, Newton realized that the gravity
                that causes an apple to fall is the same that causes the moon remain in orbit around the Earth. 
                <br><br>
                But first, a more rigorous discussion of what gravity really is. We know gravity causes things to fall, so let's start there.
                Gravity tends to pull bodies closer to each other. This leads us to our first conclusion, that as far as we know gravity
                is always attractive, tending to pull bodies closer to each other. It also gets weaker with distance, though this might not be
                entirely obvious since you and I cannot easily go far away from the Earth. (Assuming you don't have access to a rocket.) These
                are quantitatively summed up by Newton.
                <br><br>
                From some data he borrowed, Newton was able to formulate his Law of Universal Gravitation:
                <br><br>
                <b>$F_g = G \dfrac{m_1m_2}{r^2}$</b>
                <br><br>
                $G$ is a new constant, the universal gravitation constant, given by $G = 6.67 \times 10^{-11}$. This is a very small value, which
                explains why it takes something the size of a planet to produce a noticeable gravitational pull. The law is often called the inverse-square law because it depends inversely on the square of the separation between
                the two bodies. We also introduce a quasi-new quantity, the gravitational field strength:
                <br><br>
                $g = G \dfrac{M}{R^2}$
                <br><br>
                This measures the gravitational field at a particular distance from an object.
                <br><br>
                <figure>
                    <img src="/src/assets/dynamics/Figure 40.png" width = "500px">
                    <figcaption> Figure 1: Gravity is what keeps the moon in orbit around the Earth.</figcaption>
                </figure>
                <br><br>
                <div v-show="level>0">
                    I'm going to throw a conceptual question at you here. If the Earth exerts a force $F_g$ on a marble, what force does the 
                    marble exert on the Earth? Think carefully before you answer, since your intuition might not serve you perfectly!
                    <br><br>
                    The answer is that the marble exerts a force $F$ on the Earth as well! You can thank Newton's third law for that. The Earth is
                    simply too massive to feel any noticeable acceleration from the marble, so we usually don't think of objects exerting a gravitaional pull 
                    on the Earth.
                    <br><br>
                    Now, these formulas technically only works for point masses. However, Newton was also kind enough to generalize this to
                    spheres, which are the most common shape for celestial bodies. It is called the shell theorem. This theorem
                    essentially states that the gravitational force from a spherical shell can be treated as coming from its center.
                    A corollary is that there is no gravitational force on a particle inside a spherical shell.
                    The proof of this theorem requires the use of calculus.
                    <br><br>
                    <div v-show="level==2">
                        Thankfully, you are calculus students. I'll only prove the first part of the theorem since the second is
                        exceedingly complex, and I'll simplify it even further by only considering an object of mass $m$ sitting right on top of a
                        sphere of radius $R$ and mass $M$. Even with these simplifications, the proof is nontrivial.
                        <br><br>
                        Split the shell into infinitessmally small rings. Consider the gravitational force from rings on the shell 
                        with thickness $dy$.
                        <figure>
                            <img src="/src/assets/dynamics/Figure 41.png" width = "500px">
                            <figcaption> Figure 2: A visual representation of what I mean.</figcaption>
                        </figure>
                        Now, consider these rings as made up of point particles. Due to symmetry, we know that the net force
                        due to any ring will be downward. The force $dF$ from each ring, with respect to the marked angle
                        $\phi$, is:
                        <br><br>
                        $dF = G m\rho (2\pi x) \dfrac{dy}{(R-y)^2+x^2} \dfrac{R-y}{\sqrt{(R-y)^2+x^2}}$
                        <br><br>
                        Here, $\rho$ is the density of the shell, equal to $\rho = M/4\pi R^2$. The last term comes from the fact that
                        all the force must be directed in the negative y direction due to symmetry. We know that 
                        $x = R \cos \phi$ and $y = R \sin \phi$. Since this is a spherical shell, a thin ring along the surface
                        can be approximated as having thickness $dy = dR$. We can thus rewrite the previous equation as:
                        <br><br>
                        $dF = G Mm \dfrac{1}{4\pi R^2} \dfrac{2\pi R \cos \phi R d\phi}{[(R-R\cos \phi)^2+(R \sin \phi)^2]^{3/2}} (R-R\sin \phi)$
                        <br><br>
                        I know this looks complex, but just stick with me and try to keep track of the algebra. I will not be showing
                        every step because that would take aboslute ages to write. I'll skip over some basic algebraic steps and leave you
                        to fill in the gaps as an exercise. We are next going to simplify:
                        <br><br>
                        $dF = G \dfrac{Mm}{2R^2} \dfrac{\cos \phi d\phi}{(2-2\sin\phi)^{3/2}} (1-\sin\phi)$
                        <br><br>
                        This can be simplified to:
                        <br><br>
                        $dF = G \dfrac{Mm}{4\sqrt{2}R^2} \dfrac{\cos\phi d\phi}{\sqrt{1-\sin\phi}}$
                        <br><br>
                        Looking at the diagram, we see that we need to integrate from $phi = \pi/2$ to $phi = \pi/2$. We will set these
                        as our bounds of integration:
                        <br><br>
                        $F_g =  G \dfrac{Mm}{4\sqrt{2}R^2} \int_{-\frac{\pi}{2}}^{\frac{\pi}{2}} \dfrac{\cos\phi d\phi}{\sqrt{1-\sin\phi}}$
                        <br><br>
                        This can be solved by using u-substitition, where $u=\sin\phi$. The end result we get is:
                        <br><br>
                        $F_g = G \dfrac{Mm}{4\sqrt{2}R^2} [-2\sqrt{1-\sin\phi}] |_{-\frac{\pi}{2}}^{\frac{\pi}{2}}$
                        <br><br>
                        If we solve, we get an answer of:
                        <br><br>
                        $F_g = G \dfrac{Mm}{2R^2}$
                        <br><br>
                        This is not what we expected! In fact, it is off by a factor of two. Now, we carefully look back and realize that we
                        technically only integrated over one hemisphere, because sweeping from $\phi = - \pi /2$ to $\phi = \pi / 2$ only covers
                        half of the entire sphere. To get the correct answer, we simply multiply this by two:
                        <br><br>
                        $F_g = G \dfrac{Mm}{R^2}$
                        <br><br>
                        This is a loose proof of the shell theorem. The second part is much harder to prove and I won't put you
                        through that.
                        <br><br>
                    </div>
                    Now, most celestial bodies are solid spheres and not shells. However, we can treat a sphere as a
                    collection of infinitely many shells, so it all works out in the end. You can apply the first part
                    of the shell theorem to a solid sphere as well, which proves to be quite useful in problems involving many
                    planets or stars that have large radii. Remember to measure the separation $R$ between the <b>centers</b> of the spheres and
                    not the surfaces of the spheres. The theorem isn't really all that revolutionary and mostly follows 
                    common intuition.
                    <br><br>
                    However, there is one interesting case. While gravity outside the planet varies inversely as the
                    square of the distance, inside the planet things are different. We will go over this in the next section.
                </div>
                <div v-show="level==0">
                    Remember Newton's third law? Well, it still applies here! The Earth exerts a force on you, and you exert that
                    same force back on the Earth. However, the Earth has too much mass to really care, so we usually don't think of ourselves
                    as exerting a gravitaional force on the Earth. It's important to remember this fact (which applies to any two objects that have mass), however.
                    <br><br>
                    Now, there is a theorem called the shell theorem that enables us to treat spheres as just point objects, which allows
                    us to easily use Newton's Law of Universal Gravitation on them. All you need to know at this level is that
                    this theorem allows us to treat a sphere or spherical shell as having all of its mass at its center, and the distance between
                    that center and any other object in question is the separation of the bodies $R$ in the equation. 
                    <br><br>
                    The one key exception (and the second part of the shell theorem) to this is that there is <b>no gravitational field</b> inside
                    a spherical shell. This makes a sort of sense if you think about it, as the parts of the sphere you're closer to exert a stronger pull
                    but are lesser in area, while the parts further away are more numerous but exert a lesser pull in the other direction, which
                    cancels everthing out.
                    <br><br>
                    Using this theorem, we can actually figure out what the gravity inside of a planet is.
                </div>
                <div class="btn-contain-right">
                <button class="btn btn-dark" style="animation: scale1 2s infinite;" @click="$emit('nextpage')">Next
                    &rarr;</button>
            </div>
            </div>
            <div v-show="page===1">
                We can't physically go inside a planet, but thanks to physics we can mathematically do so! This
                requires the use of the shell theorem, and gives rise to a pretty interesting mathematical result.
                <br><br>
                <figure>
                    <img src="/src/assets/dynamics/Figure 43.png" width = "500px">
                    <figcaption> Figure 3: A not-so-fortunate soul gets to experience what it's like inside a planet.</figcaption>
                </figure>
                <br><br>
                <div v-show="level>0">
                    Now, what we want to realize is that any part of the planet above you can be considered a series of spherical shells.
                    However, if they're above you, that means you are inside the shells and therefore they exert no gravitational force on you.
                    The only part of the planet that matters, then, is the mass contained within a radius $r < R$, where $R$ is the radius of the
                    planet. Here's a diagram to hopefully make what I'm saying clearer. Only the mass whtin the black sphere actually matters;
                    anything outside exerts zero net force on any object and contributes zero gravitational field.
                    <br><br>
                <figure>
                    <img src="/src/assets/dynamics/Figure 42.png" width = "500px">
                    <figcaption> Figure 4: The effective mass acting when considering gravity at a distance $r$ from the center of a planet.</figcaption>
                </figure>
                <br><br>
                Now, to simplify things we'll assume the planet has a uniform density $\rho$. This isn't always true; in fact, planets tend to get denser
                towards their cores since there is a great pressure from gravity as you go deeper into the planet. Dealing with non-uniform density is
                quite possible, though it is more complex than is needed for this example.
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