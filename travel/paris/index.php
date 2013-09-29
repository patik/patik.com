<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/inc/html.php');

function print_page_body()
{
    ?>
    <div id="paris-main" role="main">

        <h1>Paris</h1>

        <section class="intro">
            <p>In March 2005, we took a short trip to Paris, France. Our first self-planned and self-executed trip, we revisited our first foray into Europe, got engaged, and took side trips to Chantilly and Mont St Michel.</p>
        </section>

        <section>
            <h2>Photos</h2>
            <div class="row travel-link-list">
                <div class="small-12 medium-6 large-4 columns">
                    <a class="bg-paris-photos" href="https://picasaweb.google.com/116513687533678150554/Paris2005#slideshow/5294679176651465778">
                        <img src="../../img/paris-photos-link.jpg" alt="The Eiffel Tower as seen from Trocadero">
                        <span>Paris</span>
                        <div class="image-cover"></div>
                    </a>
                </div>
            </div>
        </section>

    </div>
    <?php
}

$x = new Print_html();
$x->name = 'paris';
$x->section = 'travel';
$x->pageTitle = 'Paris';
$x->keywords = 'france, paris, chantilly, mont st michel, europe, travel';
$x->dirLevel = 2;
$x->useragent = $_SERVER['HTTP_USER_AGENT'];

# ajax request
if ((!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') || !empty($_GET['return'])) {
    print_page_body();
}
# navigated directly
else {
    $x->redirect = true;
}

$x->print_full_page();

?>
