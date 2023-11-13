var Recipe = Backbone.Model.extend({
    defaults: {
      title: '',
      ingredients: '',
      instructions: ''
    }
  });
  
 var RecipeCollection = Backbone.Collection.extend({
    model: Recipe
  });

var RecipeListView = Backbone.View.extend({
    el: '#recipe-list',
  
    initialize: function () {
        this.collection = new RecipeCollection([
            { title: 'Паста Карбонара', ingredients: '250 г спагетті, 1 яйце, 100-150 г бекон, 50 мл вершків, 50 г цибулі, 50 г сиру пармезан', instructions: 'Наріжте та обсмажте бекон і цибулю. Додайте туди ж на сковорідку яйце та вершки, перемішайте до однорідності та знміть з вогню. Зваріть спагетті, готову пасту поєднайте з соусом та натріть пармезан.' },
            { title: 'Тосканський томатний суп', ingredients: '600 мл води, 30 г порею, 2 томати, 100 г білої фасолі, 30 г моркви, багет', instructions: 'Замочіть фасоль у воді на годину, після цього відваріть протягом 15 хв. Почистіть та поріжте моркву й порей, залийте водою в каструлі та варіть протягом 25 хв. Бланшируйте томати (зніміть шкірку методом температурного шоку), наріжте кубиками й додайте до бульйону. Проваріть ще пару хвилин, розлийте по тарілкам й додайте рвані шматки багету.' },
            { title: 'Онігірі з тунцем', ingredients: '200 г круглозернистого рису, 200 г тунця у власному соку, лист норі, кунжут', instructions: 'Відваріть рис (пропорція 1:2). Столову ложку охолодженого рису викладіть на харчову плівку, зробіть ямку та покладіть тунець, зверху ще ложку рису. Обгорніть харчовою плівкою та сформуйте трикутник. Відріжте смужку норі та прикрасьте нею основу онігірі, вершечок обмакніть в кунжут.' },
      ]);
      this.render();
    },
  
    render: function () {
        this.collection.each(function (recipe) {
            this.$el.append('<div class="recipe-item" data-id="' + recipe.cid + '">' + recipe.get('title') + '</div>');
        }, this);
        return this;
    }
  });
  

var RecipeDetailsView = Backbone.View.extend({
    el: '#recipe-details',
  
    initialize: function () {
        this.listenTo(this.collection, 'change', this.render);
    },
  
    render: function () {
        var selectedRecipe = this.collection.get(this.model.cid);
        if (selectedRecipe) {
            this.$el.html('<h2>' + selectedRecipe.get('title') + '</h2>' +
            '<p><strong>Інгредієнти:</strong> ' + selectedRecipe.get('ingredients') + '</p>' +
            '<p><strong>Інстукція:</strong> ' + selectedRecipe.get('instructions') + '</p>');
        } else {
            this.$el.html('');
        }
        return this;
    }
  });
  
var recipeListView = new RecipeListView();
var recipeDetailsView = new RecipeDetailsView({ collection: recipeListView.collection });
  
$('#recipe-list').on('click', '.recipe-item', function () {
    var recipeId = $(this).data('id');
    var selectedRecipe = recipeListView.collection.get(recipeId);
    recipeDetailsView.model = selectedRecipe;
    recipeDetailsView.render();
});
  