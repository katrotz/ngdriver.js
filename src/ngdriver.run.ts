import angular from 'angular';

export default function run(app: angular.IModule): angular.IModule {
    app.run([function() {}]);

    return app;
}
