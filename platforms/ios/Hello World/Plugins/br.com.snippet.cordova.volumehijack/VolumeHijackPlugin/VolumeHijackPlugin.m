//
//  VolumeHijackPlugin.m
//  Volume Hijack Plugin
//
//  (c) 2105 Sandro Salles
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

#import "VolumeHijackPlugin.h"
#import <Cordova/CDV.h>


@implementation VolumeHijackPlugin

@synthesize manager;

- (void)pluginInitialize {
    
    NSLog(@"Volume Hijack Plugin");
    NSLog(@"(c)2015 Sandro Salles");
    
    [super pluginInitialize];

}

#pragma mark - Cordova Plugin Methods

- (void)listen:(CDVInvokedUrlCommand*)command {

    NSLog(@"listen");
    // Check command.arguments here.
    [self.commandDelegate runInBackground:^{
       
        self.manager = [JPSVolumeButtonHandler volumeButtonHandlerWithUpBlock:^{
            CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"HIT"];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        } downBlock:nil];

    }];

}

@end
