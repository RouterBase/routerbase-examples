require_relative "lib/routerbase/version"

Gem::Specification.new do |spec|
  spec.name = "routerbase-client"
  spec.version = RouterBase::VERSION
  spec.authors = ["RouterBase contributors"]
  spec.summary = "A small Ruby client for the RouterBase OpenAI-compatible API."
  spec.description = "A dependency-free Ruby client and CLI starter for RouterBase chat completions and model listing."
  spec.homepage = "https://routerbase.com"
  spec.license = "MIT"
  spec.required_ruby_version = ">= 2.6"

  spec.metadata = {
    "homepage_uri" => "https://routerbase.com",
    "documentation_uri" => "https://docs.routerbase.com/",
    "source_code_uri" => "https://github.com/RouterBase/routerbase-examples/tree/main/packages/ruby-routerbase",
    "changelog_uri" => "https://github.com/RouterBase/routerbase-examples/blob/main/CHANGELOG.md"
  }

  spec.files = Dir[
    "README.md",
    "LICENSE",
    "lib/**/*.rb",
    "exe/*"
  ]
  spec.bindir = "exe"
  spec.executables = ["routerbase-chat"]
  spec.require_paths = ["lib"]
end
