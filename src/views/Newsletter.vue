<script setup lang="ts">
import Nav from './../components/Nav.vue';
import BackgroundGradient from './../components/BackgroundGradient.vue';
</script>

<template>
    <BackgroundGradient />  
    <Nav />
    <section class="newsletter page-experience">
        <div class="container-fluid h-100">
            <div class="row h-100">
                <div class="col-12 h-100">
                    <div class="newsletter--content-container">
                        <div class="newsletter--title">
                            <h1>Merci pour votre achat</h1>
                        </div>
                        <div class="newsletter--text">
                            <p>Merci infiniment pour votre soutien !<br>Pour suivre nos avancées et recevoirles actualités de nos<br>produits inscrivez-vous à notre newsletter.</p>
                        </div>
                        <div class="newsletter--form-container">
                            <form action="" method="get" class="newsletter--form">
                                <div class="newsletter--form-col">
                                    <div class="newsletter--form-group">
                                        <input type="text" name="name" id="name" required  placeholder="Votre email">
                                        <input type="submit" value="Subscribe!">
                                    </div>
                                </div>
                                <div class="newsletter--cgu-group">
                                    <input type="checkbox" id="cgu" name="cgu" value="cgu">
                                    <label for="cgu">J'ai lu et j'accepte les conditions d'utilisations</label>
                                </div>
                            </form>
                        </div>
                        <div class="newsletter--cgu-container">
                            <p class="newsletter--cgu-text">
                                En vous inscrivant à notre newsletter vous participez à un tirage au sort pour 2<br>
                                billets d'avion pour aller voir nos élevages de requins dans l'océan pacifique !<br>
                                <a href="/cgu" class="newsletter--cgu-link">voir les conditons du concours ici</a>
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <router-view />
</template>

<style scoped>
.newsletter {
    color: white;
    text-align: center;
    padding: 10% 0;
}
.newsletter--content-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
}
.newsletter--cgu-text {
    font-style: italic;
}
.newsletter--cgu-link {
    text-decoration: underline;
    color: white;
    font-weight: bold;
}
.newsletter--form {
    min-width: 100%;
}
.newsletter--form-container {
    max-width: 500px;
    width: 50vw;
}
.newsletter--form-container input[type="text"] {
    background: #FFFFFF0F;
    border: 1px solid white;
    height: 60px;
    width: -webkit-fill-available;
    padding-left: 30px;
}
.newsletter--form-container input[type="text"]::placeholder {
    font-size: 1.2em;
    color: white;
}
.newsletter--content-container input[type="checkbox"] {
    height: 1em;
    aspect-ratio: 1;
    background: #FFFFFF0F;
    border: 1px solid white;
}
.newsletter--form-group {
    text-align: left;
    display: flex;
}
.newsletter--cgu-group label {
    font-family: "leaguespartan";
    font-size: .5em;
    font-weight: bold;
    font-style: italic;
    padding-left: 15px;
}
/* .newsletter--form-col {
    display: inline-flex;
    width: 100%;
} */
.newsletter--form-submit {
    aspect-ratio: 1;
    height: 100%;
    margin-left: 15px;
}
.newsletter--form-group input[type="submit"] {
    height: 60px;
    width: 60px;
    border: 1px solid white;
    font-size: 0px;
    aspect-ratio: 1;
    margin-left: 15px;
    background-color: white;
}
.h-fit-content {
    height: fit-content;
}
</style>